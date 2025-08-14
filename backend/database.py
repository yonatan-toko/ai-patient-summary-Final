from pymongo import MongoClient
import os
from dotenv import load_dotenv
import certifi

load_dotenv()
MONGO_URI = os.getenv("MONGODB_URI")

# Use Certifi's CA bundle to validate Atlas' TLS certs
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client["patient_visits_db"]
visit_collection = db["visits"]

