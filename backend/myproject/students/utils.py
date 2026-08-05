# utils.py
from django.utils import timezone
import pytz

def convert_to_user_timezone(dt, user_timezone):
    user_tz = pytz.timezone(user_timezone)
    return dt.astimezone(user_tz)
