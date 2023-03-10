import os
from datetime import timedelta


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URL"]
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "default-secret")
    SEARCH_RESULT_COUNT = 10
    PHOTO_UPLOAD_FOLDER = os.getcwd() + "/resources/images"
    VIDEO_UPLOAD_FOLDER = os.getcwd() + "/resources/videos"


class DevelopmentConfig(Config):
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=30)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)


class ProductionConfig(Config):
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)


# Create ProductionConfig, StagingConfig, DevelopmentConfig, TestingConfig, ... as needed
