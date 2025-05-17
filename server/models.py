from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from sqlalchemy.engine import Engine

db = SQLAlchemy(engine_options={"future": True})

@event.listens_for(Engine, "connect")
def set_timeout(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("SET statement_timeout TO 3000")  # 3 seconds timeout
    cursor.close()

class User(db.Model):

    __tablename__ = 'gitrank_users'

    id = db.Column(db.Integer, primary_key=True)
    github_id = db.Column(db.Integer, unique=True)
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