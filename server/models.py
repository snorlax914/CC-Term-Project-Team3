from flask_sqlalchemy import SQLAlchemy
from server.github_manager import Github
import asyncio

db = SQLAlchemy(engine_options={"future": True})

class User(db.Model):

    __tablename__ = 'gitrank_users'

    id = db.Column(db.Integer, primary_key=True)
    github_id = db.Column(db.String(80), unique=True)
    login = db.Column(db.String(80))
    access_token = db.Column(db.String(200))
    avatar_url = db.Column(db.String(200))
    html_url = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    def __init__(self, github_id, login, access_token, avatar_url, html_url):
        self.github_id = github_id
        self.login = login
        self.access_token = access_token
        self.avatar_url = avatar_url
        self.html_url = html_url

    def __repr__(self):
        return f'<User {self.login}>'

class Friend(db.Model):
    __tablename__ = 'gitrank_friends'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('gitrank_users.id', ondelete='CASCADE'), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey('gitrank_users.id', ondelete='CASCADE'), nullable=False)
    status = db.Column(db.String(20), default='pending', server_default='pending', nullable=False)
    
    user = db.relationship('User', foreign_keys=[user_id], backref='friends')
    friend = db.relationship('User', foreign_keys=[friend_id])

    __table_args__ = (
        db.UniqueConstraint('user_id', 'friend_id', name='_user_friend_uc'),
        db.CheckConstraint("status IN ('pending', 'accepted', 'blocked')", name='_status_check')
    )

    def __init__(self, user_id, friend_id, status='pending'):
        self.user_id = user_id
        self.friend_id = friend_id
        self.status = status

    def __repr__(self):
        return f'<Friend {self.user_id} -> {self.friend_id} ({self.status})>'
    

class Score(db.Model):
    __tablename__ = 'gitrank_scores'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('gitrank_users.id', ondelete='CASCADE'), nullable=False)
    score = db.Column(db.Integer, default=0, nullable=False)

    user = db.relationship('User', backref='scores')
    def __init__(self, user_id, score):
        self.user_id = user_id
        self.score = score
    
    def __repr__(self):
        return f'<Score {self.user_id} - {self.score}>'

def update_score(user_id, github_manager: Github):
    user = User.query.get(user_id)
    if not user:
        return None
    stats = asyncio.run(github_manager.get_user_stats(user.access_token, user.github_id))
    if not stats:
        return None
    """
    result = {
        'repos_count': 0,
        'stars': 0,
        'forks': 0,
        'commits': 0,
        'pulls': 0,
        'issues': 0,
        'languages': [],
    }
    """
    score = stats['repos_count'] + stats['stars'] + stats['forks'] + stats['commits'] + stats['pulls'] + stats['issues']
    
    existing_score = Score.query.filter_by(user_id=user_id).first()

    if existing_score:
        existing_score.score = score
    else:
        new_score = Score(user_id=user_id, score=score)
        db.session.add(new_score)
    db.session.commit()

    return score
    
