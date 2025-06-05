import os
from flask import Flask, render_template, redirect, url_for, request, jsonify, session
from server.models import db, User, Friend, update_score
from server.github_manager import Github
from server.config import Config
import requests
from urllib.parse import urlencode
from dotenv import load_dotenv
from functools import wraps
import uuid
import asyncio
from server.jwt_utils import create_access_token, verify_access_token
from sqlalchemy import and_, or_, func
import traceback
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)

gh_manager = Github()

def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        user_id = verify_access_token(token, app)
        if not user_id:
            return jsonify({'message': 'Invalid or expired token!'}), 401
        
        return f(user_id, *args, **kwargs)
    
    return decorated_function

@app.route('/auth/refresh', methods=['POST'])
@token_required
def refresh_token(user_id):
    new_token = create_access_token(user_id, app)
    return jsonify({'access_token': new_token})

@app.route('/login')
def login():
    state = str(uuid.uuid4())
    params = urlencode({
        'client_id': app.config['GITHUB_CLIENT_ID'],
        'redirect_uri': app.config['CALLBACK_URL'],
        'state': state
    })
    auth_url = f"{app.config['GITHUB_AUTHORIZE_URL']}?{params}"
    return jsonify({
        'oauth_url': auth_url,
        'state': state  # Client must store and verify this
    })

@app.route('/api/auth/callback/github')
def callback():
    if not request.args.get('state'):
        return jsonify({'error': 'Missing state parameter'}), 400
    
    if not request.args.get('code'):
        return jsonify({'error': 'Missing code parameter'}), 400
    
    data = {
        'client_id': app.config['GITHUB_CLIENT_ID'],
        'client_secret': app.config['GITHUB_CLIENT_SECRET'],
        'code': request.args.get('code'),
        'redirect_uri': app.config['CALLBACK_URL'],
    }
    headers = {"Accept": "application/vnd.github+json"}

    try:
        token_response = requests.post(app.config['GITHUB_TOKEN_URL'], headers=headers, data=data)
        token_response.raise_for_status()
        access_token = token_response.json().get('access_token')

        if not access_token:
            return "Failed to fetch access token", 400
        
        user_info = asyncio.run(gh_manager.get_user_info(access_token))
        user = User.query.filter_by(github_id=user_info['githubId']).first()
        if not user:
            user = User(
                github_id=user_info['githubId'],
                login=user_info['login'],
                access_token=access_token,
                avatar_url=user_info['avatarUrl'],
                html_url=user_info['url'],
            )
            db.session.add(user)
        else:
            user.access_token = access_token

        update_score(user.id, gh_manager)
        db.session.commit()

        token = create_access_token(user.id, app)
        return jsonify({
            'access_token': token,
            'user': {
                'id': user.id,
                'login': user.login,
                'avatar_url': user.avatar_url
            }
        })
    except Exception as e:
        db.session.rollback()
        print(traceback.format_exc())
        return f"Error fetching user info: {str(e)}", 500
  
@app.route('/stats/<string:login>', methods=['GET'])
@token_required
def stats(user_id, login):
    user = User.query.filter_by(login=login).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    try:
        stats = asyncio.run(gh_manager.get_user_stats(user.access_token, user.github_id))
        if not stats:
            return jsonify({'error': 'Failed to fetch stats'}), 500
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/contributions/<string:login>', methods=['GET'])
@token_required
def contributions(user_id, login):
    user = User.query.filter_by(login=login).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    try:
        contributions = asyncio.run(gh_manager.get_user_contributions(user.login, user.access_token, start_date, end_date))
        if not contributions:
            return jsonify({'error': 'Failed to fetch contributions'}), 500
        return jsonify(contributions), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/friends/request', methods=['POST'])
@token_required
def send_friend_request(user_id):
    data = request.get_json()
    if not data or 'friend_id' not in data:
        return jsonify({'error': 'Missing friend_id'}), 400
    
    friend_id = data['friend_id']
    current_user_id = user_id

    friend = db.session.get(User, friend_id)
    if not friend:
        return jsonify({'error': 'User not found'}), 404
    
    if current_user_id == friend_id:
        return jsonify({'error': 'Cannot add yourself'}), 400
    
    existing = Friend.query.filter(
        or_(
            and_(Friend.user_id == current_user_id, Friend.friend_id == friend_id),
            and_(Friend.user_id == friend_id, Friend.friend_id == current_user_id)
        )
    ).first()

    if existing:
        return jsonify({'error': 'Friend request already exists'}), 409
    
    new_request = Friend(
        user_id=current_user_id,
        friend_id=friend_id,
        status='pending'
    )
    db.session.add(new_request)
    db.session.commit()

    return jsonify({
        'message': 'Friend request sent',
        'request_id': new_request.id
    }), 200

@app.route('/friends/requests', methods=['GET'])
@token_required
def get_friend_requests(user_id):
    current_user_id = user_id

    pending_requests = db.session.query(Friend, User).join(
        User, Friend.user_id == User.id
    ).filter(
        Friend.friend_id == current_user_id,
        Friend.status == 'pending'
    ).all()

    return jsonify([{
        'request_id': fr.Friend.id,
        'from_user': {
            'id': fr.User.id,
            'login': fr.User.login,
            'avatar_url': fr.User.avatar_url
        },
        'status': fr.Friend.status
    } for fr in pending_requests])

@app.route('/friends/requests/<int:request_id>/accept', methods=['PUT'])
@token_required
def accept_friend_request(user_id, request_id):
    current_user_id = user_id
    friend_request = Friend.query.get_or_404(request_id)

    if friend_request.friend_id != current_user_id:
        return jsonify({'error': 'Not your friend request'}), 403
    
    if friend_request.status != 'pending':
        return jsonify({'error': 'Request already processed'}), 400
    
    friend_request.status = 'accepted'
    db.session.commit()

    return jsonify({
        'message': 'Friend request accepted',
        'friend_id': friend_request.user_id
    })

@app.route('/friends/requests/<int:request_id>/reject', methods=['PUT'])
@token_required
def reject_friend_request(user_id, request_id):
    current_user_id = user_id
    friend_request = Friend.query.get_or_404(request_id)

    if friend_request.friend_id != current_user_id:
        return jsonify({'error': 'Not your friend request'}), 403

    if friend_request.status != 'pending':
        return jsonify({'error': 'Request already processed'}), 400

    db.session.delete(friend_request)
    db.session.commit()

    return jsonify({'message': 'Friend request rejected'})

@app.route('/friends/<int:friend_id>/delete', methods=['DELETE'])
@token_required
def delete_friend(user_id, friend_id):
    current_user_id = user_id

    friendship = Friend.query.filter(
        or_(
            and_(Friend.user_id == current_user_id, Friend.friend_id == friend_id),
            and_(Friend.user_id == friend_id, Friend.friend_id == current_user_id)
        ),
        Friend.status == 'accepted'
    ).first()

    if not friendship:
        return jsonify({'error': 'Friendship not found'}), 404
    
    db.session.delete(friendship)
    db.session.commit()

    return jsonify({
        'message': 'Friend deleted successfully',
        'deleted_friend_id': friend_id
    })

@app.route('/friends', methods=['GET'])
@token_required
def get_friends(user_id):
    current_user_id = user_id

    friendships = db.session.query(Friend, User).join(
        User,
        or_(
            and_(Friend.user_id == User.id, Friend.friend_id == current_user_id),
            and_(Friend.friend_id == User.id, Friend.user_id == current_user_id)
        )
    ).filter(
        Friend.status == 'accepted'
    ).all()

    friends = []
    for fr in friendships:
        friend_user = fr.User if fr.User.id != current_user_id else None
        if friend_user:
            friends.append({
                'id': friend_user.id,
                'login': friend_user.login,
                'avatar_url': friend_user.avatar_url
            })
    return jsonify(friends)

@app.route('/search', methods=['GET'])
def search_users():
    query = request.args.get('query', '').strip()
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400
    users = User.query.filter(func.lower(User.login).like(f'%{query.lower()}%')).all()
    results = [{
        'id': user.id,
        'login': user.login,
        'avatar_url': user.avatar_url,
        'html_url': user.html_url
    } for user in users]
    return jsonify(results), 200

@app.route('/score/<int:user_id>', methods=['GET'])
def get_user_score(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    score = update_score(user.id, gh_manager)
    if score is None:
        return jsonify({'error': 'Failed to update score'}), 500
    return jsonify({'user_id': user.id, 'score': score}), 200

    
