import os
from flask import Flask, render_template, redirect, url_for, request, jsonify, session
from server.models import db, User, Friend
from server.github_manager import Github
from server.config import Config
import requests
from urllib.parse import urlencode
from dotenv import load_dotenv
from functools import wraps
import uuid
import asyncio
from sqlalchemy import and_, or_

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')
app.config.from_object(Config)

db.init_app(app)

gh_manager = Github()

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('index')) # change to login page when implemented
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    authorized = 'user_id' in session
    return render_template('index.html', authorized=authorized)

@app.route('/login')
def login():
    session['current_state'] = str(uuid.uuid4())
    params = urlencode({
        'client_id': app.config['GITHUB_CLIENT_ID'],
        'redirect_uri': app.config['CALLBACK_URL'],
        'state': session['current_state']
    })
    return redirect(app.config['GITHUB_AUTHORIZE_URL']+'?'+params)

@app.route('/api/auth/callback/github')
def callback():
    request_state = request.args.get('state')
    if not request_state:
        return "Missing state parameter in callback", 400

    if request.args.get('state') != session['current_state']:
        return "Invalid state parameter", 403
    
    code = request.args.get('code')
    if not code:
        return "Missing code parameter", 400
    
    data = {
        'client_id': app.config['GITHUB_CLIENT_ID'],
        'client_secret': app.config['GITHUB_CLIENT_SECRET'],
        'code': code,
        'redirect_uri': app.config['CALLBACK_URL'],
    }
    headers = {"Accept": "application/vnd.github+json"}

    response = requests.post(app.config['GITHUB_TOKEN_URL'], headers=headers, data=data)
    if response.status_code != 200:
        return "Failed to fetch access token", 400
    token_data = response.json()
    access_token = token_data.get('access_token')
    if not access_token:
        return "Failed to fetch access token", 400
    try:
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
        
        db.session.commit()
        session['user_id'] = user.id
    except Exception as e:
        db.session.rollback()
        return f"Error fetching user info: {str(e)}", 500
    return redirect(url_for('index'))

    
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('index'))
    
@app.route('/stats/<string:login>', methods=['GET'])
@login_required
def stats(login):
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
@login_required
def contributions(login):
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
@login_required
def send_friend_request():
    data = request.get_json()
    if not data or 'friend_id' not in data:
        return jsonify({'error': 'Missing friend_id'}), 400
    
    friend_id = data['friend_id']
    current_user_id = session['user_id']

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
@login_required
def get_friend_requests():
    current_user_id = session['user_id']

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
@login_required
def accept_friend_request(request_id):
    current_user_id = session['user_id']
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
@login_required
def reject_friend_request(request_id):
    current_user_id = session['user_id']
    friend_request = Friend.query.get_or_404(request_id)

    if friend_request.friend_id != current_user_id:
        return jsonify({'error': 'Not your friend request'}), 403

    if friend_request.status != 'pending':
        return jsonify({'error': 'Request already processed'}), 400

    db.session.delete(friend_request)
    db.session.commit()

    return jsonify({'message': 'Friend request rejected'})

@app.route('/friends/<int:friend_id>/delete', methods=['DELETE'])
@login_required
def delete_friend(friend_id):
    current_user_id = session['user_id']

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
@login_required
def get_friends():
    current_user_id = session['user_id']

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
