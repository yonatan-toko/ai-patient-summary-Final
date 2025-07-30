from llm import generate_recommendations
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from database import visit_collection
from bson import ObjectId
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request body model
class Visit(BaseModel):
    patientName: str
    visitDate: str
    doctorName: str
    visitSummary: str
    diagnosis: Optional[str] = None

@app.post("/api/visits")
async def create_visit(visit: Visit):
    visit_dict = visit.dict()
    visit_dict["createdAt"] = visit_dict["visitDate"]
    result = visit_collection.insert_one(visit_dict)
    return {"id": str(result.inserted_id)}

@app.get("/api/visits")
async def get_all_visits():
    visits = []
    for visit in visit_collection.find():
        visit["_id"] = str(visit["_id"])
        visits.append(visit)
    return visits

@app.get("/api/visits/{visit_id}")
async def get_visit(visit_id: str):
    visit = visit_collection.find_one({"_id": ObjectId(visit_id)})
    if visit:
        visit["_id"] = str(visit["_id"])
        return visit
    raise HTTPException(status_code=404, detail="Visit not found")

@app.post("/api/visits/{visit_id}/recommendations")
async def get_recommendations(visit_id: str):
    visit = visit_collection.find_one({"_id": ObjectId(visit_id)})
    if not visit:
        raise HTTPException(status_code=404, detail="Visit not found")

    summary = visit.get("visitSummary", "")
    if not summary:
        raise HTTPException(status_code=400, detail="Visit summary is missing")

    try:
        recommendations = generate_recommendations(summary)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))