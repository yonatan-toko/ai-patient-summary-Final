import os
import json
import time
import requests

AMPLITUDE_API_KEY = os.getenv('VITE_AMPLITUDE_API_KEY')
REGION = os.getenv('VITE_AMPLITUDE_REGION' or 'US').upper()
INGEST_URL = 'https://api2.amplitude.com/2/httpapi' if REGION == 'US' else 'https://api2.amplitude.eu/2/httpapi'

def send_event(user_id: str, event_type: str, event_properties: dict | None = None, device_id: str | None = None):

    assert AMPLITUDE_API_KEY, "AMPLITUDE_API_KEY missing"

    payload = {
        "api_key": AMPLITUDE_API_KEY,
        "events": [
            {
                "user_id": user_id,
                "event_type": event_type,
                "time": int(time.time() * 1000),  # Current time in milliseconds
                "event_properties": event_properties or {},
                "device_id": device_id or "server-device-id"
            }
        ]
    }

    response = requests.post(INGEST_URL, json=payload, timeout=10)
    if not response.ok:
        raise RuntimeError(f"Failed to send event: {response.status_code} {response.text}")
    return response.json()