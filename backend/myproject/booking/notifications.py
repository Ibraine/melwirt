from django.core.mail import send_mail
from django.conf import settings
from twilio.rest import Client

MEET_LINK = getattr(settings, "MEET_LINK", "https://meet.google.com/xyz-abcd-pqr")

def send_email(subject, message, to_list):
    try:
        send_mail(subject, message, settings.EMAIL_HOST_USER, to_list, fail_silently=False)
    except Exception as e:
        print("Email send error:", e)

def send_whatsapp_via_twilio(to_number, message):
    try:
        client = Client(settings.TWILIO_SID, settings.TWILIO_AUTH)
        client.messages.create(
            body=message,
            from_=settings.TWILIO_WHATSAPP_NUMBER,
            to=f'whatsapp:{to_number}'
        )
    except Exception as e:
        print("WhatsApp Error:", e)

def format_local_time_for_booking(booking):
    """
    Return a human readable time string including date, time, and timezone/country.
    """
    try:
        # Prefer student's selected time
        if booking.student_time:
            date_str = booking.date.strftime("%Y-%m-%d") if booking.date else ""
            tz_display = booking.student_timezone or ""
            country_code = (booking.student_country or booking.country or "").upper()

            time_part = booking.student_time
            if tz_display:
                time_part += f" ({tz_display})"
            elif country_code:
                time_part += f" ({country_code})"

            if date_str:
                return f"{date_str}, {time_part}"
            return time_part

        # Fallback to server-side date and time
        if booking.date and booking.time:
            return f"{booking.date.strftime('%Y-%m-%d')} {booking.time.strftime('%I:%M %p')}"

        return None

    except Exception as e:
        print("format_local_time_for_booking error:", e)
        try:
            return f"{booking.date} {booking.time}" if booking.date and booking.time else None
        except:
            return None

def notify_booking_created(booking):
    name = booking.name or "Student"
    subject = "Your Demo Class Booking"
    local_time_str = format_local_time_for_booking(booking) or ""
    
    email_message = f"""
Hi {name},

✅ Your demo class is booked successfully!
Course: {booking.course}
Date & Time: {local_time_str}

Join via Google Meet: {MEET_LINK}

Regards,
Team
""".strip()

    whatsapp_message = f"""
Hi {name}, ✅
Your demo class is booked successfully!

Course: {booking.course}
Date & Time: {local_time_str}

Join via Google Meet: {MEET_LINK}
""".strip()

    if booking.email:
        send_email(subject, email_message, [booking.email])

    if booking.mobile:
        send_whatsapp_via_twilio(booking.mobile, whatsapp_message)
