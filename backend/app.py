import json

from dotenv import load_dotenv
from flask import Flask
from flask_jwt_extended.jwt_manager import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from werkzeug.exceptions import HTTPException
from werkzeug.local import LocalProxy

from config import Config

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
logger = LocalProxy(lambda: app.logger)


@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    logger.error(e)  # type: ignore

    # start with the correct headers and status code from the error
    response = e.get_response()

    # replace HTML body with JSON
    response.data = json.dumps(
        {
            "code": e.code,
            "name": e.name,
            "description": e.description,
        }
    )

    response.content_type = "application/json"
    return response


from terraluna.auth.views import auth_bp

app.register_blueprint(auth_bp, url_prefix="/auth")