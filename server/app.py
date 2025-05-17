import os
from flask import Flask, render_template, redirect, url_for, request, jsonify, session
from server.models import db, User
from server.github_manager import Github
from server.config import Config
import requests
from urllib.parse import urlencode
from dotenv import load_dotenv
from functools import wraps
import uuid
import asyncio
from sqlalchemy import select

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
        user = db.session.get(User, {"github_id": user_info['id']})
        if not user:
            user = User(
                github_id=user_info['id'],
                login=user_info['login'],
                access_token=access_token,
                avatar_url=user_info['avatar_url'],
                html_url=user_info['html_url'],
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
    
@app.route('/stats')
@login_required
def stats():
    user = db.session.get(User, session['user_id'])
    if not user:
        return jsonify({'error': 'User not found'}), 404
    try:
        stats = asyncio.run(gh_manager.get_user_stats(user.access_token))
        if not stats:
            return jsonify({'error': 'Failed to fetch stats'}), 500
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=5001)
