from pymongo import MongoClient
from .globals import Settings

settings = Settings()
db = None

try:
    db = MongoClient(settings.MONGO_HOST)
except:
    raise Exception("Error connecting to the database")