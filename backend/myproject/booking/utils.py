# booking/utils.py

from datetime import datetime
import pytz

def parse_time_string(time_str):
    """
    Converts a string like '14:30' to a time object.
    """
    try:
        return datetime.strptime(time_str, "%H:%M").time()
    except ValueError:
        raise ValueError(f"Invalid time format: {time_str}. Expected HH:MM")

def parse_iso_utc(iso_str):
    """
    Converts ISO formatted UTC string to a datetime object in UTC.
    Example: '2025-10-28T10:30:00Z'
    """
    try:
        dt = datetime.strptime(iso_str, "%Y-%m-%dT%H:%M:%SZ")
        return dt.replace(tzinfo=pytz.UTC)
    except ValueError:
        raise ValueError(f"Invalid ISO UTC format: {iso_str}. Expected YYYY-MM-DDTHH:MM:SSZ")

def get_timezone_for_country_or_tz(tz_or_country):
    """
    Returns a pytz timezone object for a given timezone string or country code.
    Example: 'Asia/Kolkata' or 'IN'
    """
    try:
        if tz_or_country in pytz.all_timezones:
            return pytz.timezone(tz_or_country)
        else:
            # Try country code
            from pytz import country_timezones
            tz_list = country_timezones.get(tz_or_country.upper())
            if tz_list:
                return pytz.timezone(tz_list[0])  # take first timezone of the country
            else:
                raise ValueError(f"Unknown timezone or country code: {tz_or_country}")
    except Exception as e:
        raise e
