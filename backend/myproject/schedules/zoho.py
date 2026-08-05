import requests
from django.conf import settings
from datetime import datetime

def get_zoho_access_token():
    url = "https://accounts.zoho.in/oauth/v2/token"
    params = {
        "refresh_token": settings.ZOHO_REFRESH_TOKEN,
        "client_id": settings.ZOHO_CLIENT_ID,
        "client_secret": settings.ZOHO_CLIENT_SECRET,
        "grant_type": "refresh_token",
    }
    res = requests.post(url, params=params)
    return res.json().get("access_token")


def create_zoho_meeting(topic, start_time):
    access_token = get_zoho_access_token()

    url = "https://meeting.zoho.in/api/v2/meetings"
    headers = {
        "Authorization": f"Zoho-oauthtoken {access_token}",
        "Content-Type": "application/json",
    }

    payload = {
        "topic": topic,
        "startTime": start_time,
        "duration": 60
    }

    res = requests.post(url, json=payload, headers=headers)
    data = res.json()

    return data["meeting"]["joinLink"]
