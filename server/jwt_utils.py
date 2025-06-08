import jwt
from datetime import datetime, timedelta

def create_access_token(user_id, app):
    expires = datetime.now() + app.config['JWT_ACCESS_TOKEN_EXPIRES']
    token = jwt.encode(
        {
            'user_id': user_id,
            'exp': expires
        },
        app.config['JWT_SECRET_KEY'],
        algorithm='HS256'
    )
    return token

def verify_access_token(token, app):
    try:
        payload = jwt.decode(
            token, 
            app.config['JWT_SECRET_KEY'],
            algorithms=['HS256']
        )
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        app.logger.warning("Token expired")
    except jwt.InvalidTokenError:
        app.logger.warning("Invalid token")
    return None