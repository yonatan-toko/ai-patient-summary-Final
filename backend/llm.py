import os
import requests
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("LLM_API_KEY")
MODEL = "mistralai/mixtral-8x7b-instruct"

def generate_recommendations(summary: str) -> str:
    prompt = f"""
You are a clinical assistant AI helping patients understand their doctor visits.

Based on the visit summary below, write **brief, clear, and helpful recommendations based on the diagnosis**. Do not include greetings, introductions, or disclaimers. Use simple language. Limit to 3–5 concise bullet points. write the answer as a continuous paragraph.

Visit Summary:
{summary}

Patient Recommendations:
"""

    response = requests.post(
    "https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",
        "X-Title": "Patient Visit Assistant"
    },
    json={
        "model": "mistralai/mixtral-8x7b-instruct",
        "messages": [
            {"role": "system", "content": "You are a medical assistant."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 250,
        "temperature": 0.7
    },
    timeout=30  # seconds
)

    data = response.json()

    if "choices" not in data:
        raise Exception(data.get("error", {}).get("message", "Unknown error"))

    return data["choices"][0]["message"]["content"].strip()
