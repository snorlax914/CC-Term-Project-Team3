
from server.app import app
from server.models import db

def create_db():
    with app.app_context():
        db.create_all()