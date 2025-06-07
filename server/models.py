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

    repos_count = db.Column(db.Integer, default=0, nullable=True)
    stars = db.Column(db.Integer, default=0, nullable=True)
    forks = db.Column(db.Integer, default=0, nullable=True)
    commits = db.Column(db.Integer, default=0, nullable=True)
    pulls = db.Column(db.Integer, default=0, nullable=True)
    issues = db.Column(db.Integer, default=0, nullable=True)
    languages = db.Column(db.JSON, default=dict, nullable=True)
    score = db.Column(db.Float, default=0, nullable=True)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    weights = {
        'commits': 1.0,
        'pulls':   1.5,
        'issues':  1.2,
        'stars':   0.5,
        'forks':   0.5
    }
    min_raw_score = 0.0
    max_raw_score = 15000.0
    
    def __init__(self, github_id, login, access_token, avatar_url, html_url):
        self.github_id = github_id
        self.login = login
        self.access_token = access_token
        self.avatar_url = avatar_url
        self.html_url = html_url

    def __repr__(self):
        return f'<User {self.login}>'
    
    def compute_raw_score(self) -> float:
        return (
            (self.commits or 0) * self.weights['commits'] +
            (self.pulls   or 0) * self.weights['pulls']   +
            (self.issues  or 0) * self.weights['issues']  +
            (self.stars   or 0) * self.weights['stars']   +
            (self.forks   or 0) * self.weights['forks']
        )

    def normalize_score(self, raw_score: float) -> float:
        if raw_score <= self.min_raw_score:
            return 0.0
        if raw_score >= self.max_raw_score:
            return 100.0
        normalized = 100.0 * (raw_score - self.min_raw_score) / (self.max_raw_score - self.min_raw_score)
        return normalized

def update_stat(user_id, github_manager: Github):
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
    user.repos_count = stats['repos_count']
    user.stars = stats['stars']
    user.forks = stats['forks']
    user.commits = stats['commits']
    user.pulls = stats['pulls']
    user.issues = stats['issues']
    user.languages = stats['languages']
    user.score = stats['repos_count'] + stats['stars'] + stats['forks'] + stats['commits'] + stats['pulls'] + stats['issues']
    
    raw = user.compute_raw_score()
    user.raw_score = raw
    user.score = user.normalize_score(raw)
    
    db.session.commit()

class Friend(db.Model):
    __tablename__ = 'gitrank_friends'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('gitrank_users.id', ondelete='CASCADE'), nullable=True)
    friend_id = db.Column(db.Integer, db.ForeignKey('gitrank_users.id', ondelete='CASCADE'), nullable=True)
    status = db.Column(db.String(20), default='pending', server_default='pending', nullable=True)
    
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

    
