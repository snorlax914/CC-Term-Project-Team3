import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

class Config:
    GITHUB_CLIENT_ID = os.getenv('GITHUB_CLIENT_ID')
    GITHUB_CLIENT_SECRET = os.getenv('GITHUB_CLIENT_SECRET')
    GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize'
    GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'
    
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    CALLBACK_URL = 'http://localhost:5001/callback'
    
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') + '?sslmode=require'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS ={
        'pool_pre_ping': True,
        'pool_recycle': 300,
        'pool_size': 10,
        'max_overflow': 20,
    }
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-very-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=30)