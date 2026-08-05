from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db import transaction
from django.conf import settings
from schedules.models import ClassSchedule
from schedules.serializers import ClassScheduleSerializer




from .models import Tutor, Booking
# from .serializers import TutorSerializer, TutorSlotSerializer, BookingSerializer
from .serializers import TutorSerializer, BookingSerializer

from . import notifications

from datetime import datetime, date, time as dtime
import pytz
import logging

logger = logging.getLogger(__name__)


# ------------------------
# Helpers
# ------------------------
def parse_time_string(timestr):
    if timestr is None:
        return None
    if isinstance(timestr, dtime):
        return timestr
    if isinstance(timestr, datetime):
        return timestr.time()
    s = str(timestr).strip()
    formats = ["%I:%M %p", "%I:%M%p", "%H:%M:%S", "%H:%M", "%I %p"]
    for fmt in formats:
        try:
            return datetime.strptime(s, fmt).time()
        except Exception:
            continue
    try:
        parts = s.split(":")
        hour = int(parts[0])
        minute = int(parts[1]) if len(parts) > 1 else 0
        return dtime(hour=hour, minute=minute)
    except Exception:
        return None


def get_timezone_for_country_or_tz(country_or_tz):
    if not country_or_tz:
        return getattr(settings, "TIME_ZONE", "UTC")
    val = str(country_or_tz).strip()
    if "/" in val:
        try:
            pytz.timezone(val)
            return val
        except Exception:
            pass
    try:
        cc = val.upper()
        tzs = pytz.country_timezones.get(cc)
        if tzs and len(tzs) > 0:
            return tzs[0]
    except Exception:
        pass
    return getattr(settings, "TIME_ZONE", "UTC")


def is_future_in_tz(date_obj, time_obj, tz_name):
    try:
        tz = pytz.timezone(tz_name)
    except Exception:
        tz = pytz.timezone(getattr(settings, "TIME_ZONE", "UTC"))

    if not date_obj:
        return True

    if time_obj:
        naive_dt = datetime.combine(date_obj, time_obj)
        local_dt = tz.localize(naive_dt) if naive_dt.tzinfo is None else naive_dt.astimezone(tz)
        now_local = timezone.now().astimezone(tz)
        return local_dt > now_local
    else:
        local_now = timezone.now().astimezone(tz).date()
        return date_obj >= local_now


# ------------------------
# Public booking endpoint
# ------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def book_demo(request):
    serializer = BookingSerializer(data=request.data, context={'request': request})
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    validated = serializer.validated_data
    email = validated.get('email')
    name = validated.get('name') or (email.split('@')[0] if email else "GuestUser")
    mobile = validated.get('mobile')
    course = validated.get('course')
    date_obj = validated.get('date')
    time_raw = validated.get('time')
    student_time_str = validated.get('student_time') or (time_raw if isinstance(time_raw, str) else None)
    student_tz_in = validated.get('student_timezone') or validated.get('country')
    student_country = validated.get('student_country') or validated.get('country')

    student_tz_name = get_timezone_for_country_or_tz(student_tz_in)
    parsed_time_obj = parse_time_string(time_raw) if time_raw else None
    if not parsed_time_obj and student_time_str:
        parsed_time_obj = parse_time_string(student_time_str)

    try:
        if date_obj:
            valid_future = is_future_in_tz(date_obj, parsed_time_obj, student_tz_name)
            if not valid_future:
                return Response(
                    {"detail": "Selected date/time appears to be in the past for the provided timezone."},
                    status=status.HTTP_400_BAD_REQUEST
                )
    except Exception as e:
        logger.exception("Error during future-check validation: %s", e)
        pass

    try:
        with transaction.atomic():
            booking = serializer.save(
                name=name,
                email=email,
                mobile=mobile,
                course=course,
                date=date_obj,
                time=parsed_time_obj or (time_raw if isinstance(time_raw, dtime) else None),
                student=request.user if request.user.is_authenticated else None
            )

            # if not booking.meeting_link:
            #     default_link = getattr(settings, "MEET_LINK", None)
            #     if default_link:
            #         booking.meeting_link = default_link
            #         booking.save(update_fields=['meeting_link'])

            try:
                notifications.notify_booking_created(booking)
            except Exception as e:
                logger.exception("Notification send error: %s", e)

            resp = {
                "status": "success",
                "booking_id": booking.id,
                # "meet_link": booking.meeting_link or getattr(settings, "MEET_LINK", "https://meet.google.com/xyz-abcd-pqr"),
                "meet_link": booking.meeting_link,
                "date": str(booking.date) if booking.date else None,
                "time": booking.student_time or (booking.time.strftime("%I:%M %p") if booking.time else None),
                "student_time": booking.student_time,
                "student_timezone": booking.student_timezone,
                "student_country": booking.student_country or booking.country,
                "course": booking.course,
                "email": booking.email,
                # "tutor": booking.tutor.user.get_full_name() if booking.tutor else None,
                "tutor": booking.tutor.user.first_name if booking.tutor else None,
                "country": booking.country
            }
            return Response(resp, status=status.HTTP_201_CREATED)
    except Exception as e:
        logger.exception("book_demo save error: %s", e)
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ------------------------
# TutorSlot management
# ------------------------
# class TutorSlotViewSet(viewsets.ModelViewSet):
#     queryset = TutorSlot.objects.all()
#     serializer_class = TutorSlotSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         qs = super().get_queryset()
#         tutor_id = self.request.query_params.get('tutor_id')
#         if tutor_id:
#             qs = qs.filter(tutor_id=tutor_id)
#         today = timezone.localdate()
#         return qs.filter(date__gte=today)


# ------------------------
# Booking management
# ------------------------
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = Booking.objects.all()

        if user.is_staff:
            qs = Booking.objects.all()
        elif hasattr(user, 'tutor_profile'):
            qs = Booking.objects.filter(tutor=user.tutor_profile)
        else:
            qs = Booking.objects.filter(student=user)

        status_filter = self.request.query_params.get('status')
        if status_filter == 'upcoming':
            qs = qs.filter(date__gte=timezone.now().date())
        elif status_filter == 'past':
            qs = qs.filter(date__lt=timezone.now().date())

        return qs.order_by('-created_at')

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser], url_path='reassign')
    def reassign(self, request, pk=None):
        booking = self.get_object()
        new_slot_id = request.data.get('new_slot_id')
        if not new_slot_id:
            return Response({"detail": "new_slot_id required"}, status=status.HTTP_400_BAD_REQUEST)

        # new_slot = get_object_or_404(TutorSlot, id=new_slot_id)
        new_slot = get_object_or_404(ClassSchedule, id=new_slot_id)
        try:
            with transaction.atomic():
                if new_slot.student:
                    return Response({"detail": "Target slot is already booked."}, status=status.HTTP_400_BAD_REQUEST)

                # if booking.slot:
                #     booking.slot.is_booked = False
                #     booking.slot.save(update_fields=['is_booked'])

                # new_slot.is_booked = True
                # new_slot.save(update_fields=['is_booked'])
                if booking.slot:
                     booking.slot.student = None
                     booking.slot.save(update_fields=["student"])

                new_slot.student = booking.student
                new_slot.save(update_fields=["student"])
                
                booking.slot = new_slot
                booking.tutor = new_slot.tutor
                booking.status = Booking.STATUS_REASSIGNED
                booking.save()

                try:
                    notifications.notify_reassignment(booking)
                except Exception as e:
                    logger.exception("Reassignment notification error: %s", e)

                return Response(BookingSerializer(booking, context={'request': request}).data)
        except Exception as e:
            logger.exception("Reassign error: %s", e)
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser], url_path='cancelled')
    def cancelled_list(self, request):
        qs = Booking.objects.filter(status=Booking.STATUS_CANCELLED_BY_TUTOR)
        return Response(BookingSerializer(qs, many=True).data)

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser], url_path='cancel')
    def cancel(self, request, pk=None):
        booking = self.get_object()
        if booking.status == Booking.STATUS_CANCELLED_BY_ADMIN:
            return Response({"detail": "Booking is already cancelled."}, status=status.HTTP_400_BAD_REQUEST)

        booking.status = Booking.STATUS_CANCELLED_BY_ADMIN
        booking.save(update_fields=['status'])

        try:
            notifications.notify_cancellation(booking)
        except Exception as e:
            logger.exception("Cancellation notification failed: %s", e)

        return Response({"status": "success", "booking_id": booking.id, "message": "Booking cancelled successfully."})


# ------------------------
# DemoBooking for public + admin
# ------------------------
class DemoBookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        status_param = request.GET.get('status')
        queryset = self.get_queryset()

        # use timezone-aware 'today'
        today = timezone.now().date()
        if status_param == 'upcoming':
            queryset = queryset.filter(date__gte=today)
        elif status_param == 'past':
            queryset = queryset.filter(date__lt=today)

        # EXCLUDE bookings cancelled by admin so they don't show in upcoming
        queryset = queryset.exclude(status=Booking.STATUS_CANCELLED_BY_ADMIN)

        serializer = self.get_serializer(queryset, many=True)
        return Response({'results': serializer.data}, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        booking = serializer.save()
        return Response(BookingSerializer(booking, context={'request': request}).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'], url_path='cancel')
    def cancel(self, request, pk=None):
        booking = self.get_object()
        if booking.status == Booking.STATUS_CANCELLED_BY_ADMIN:
            return Response({"detail": "Booking is already cancelled."}, status=status.HTTP_400_BAD_REQUEST)

        booking.status = Booking.STATUS_CANCELLED_BY_ADMIN
        booking.save(update_fields=['status'])

        try:
            notifications.notify_cancellation(booking)
        except Exception as e:
            logger.exception("Cancellation notification failed: %s", e)

        return Response({
            "status": "success",
            "booking_id": booking.id,
            "message": "Booking cancelled successfully"
        })

    @action(detail=True, methods=['post'], url_path='reassign')
    def reassign(self, request, pk=None):
        booking = self.get_object()
        new_slot_id = request.data.get('new_slot_id')
        if not new_slot_id:
            return Response({"detail": "new_slot_id required"}, status=status.HTTP_400_BAD_REQUEST)

        # new_slot = get_object_or_404(TutorSlot, id=new_slot_id)
        new_slot = get_object_or_404(ClassSchedule, id=new_slot_id)
        try:
            with transaction.atomic():
                if new_slot.student:
                    return Response({"detail": "Target slot is already booked."}, status=status.HTTP_400_BAD_REQUEST)

                if booking.slot:
                    booking.slot.student = None
                    booking.slot.save(update_fields=["student"])

                new_slot.student = booking.student
                new_slot.save(update_fields=["student"])


                booking.slot = new_slot
                booking.tutor = new_slot.tutor
                booking.status = Booking.STATUS_REASSIGNED
                booking.save()

                try:
                    notifications.notify_reassignment(booking)
                except Exception as e:
                    logger.exception("Reassignment notification error: %s", e)

                return Response(BookingSerializer(booking, context={'request': request}).data)
        except Exception as e:
            logger.exception("Reassign error: %s", e)
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ------------------------
# Tutor read-only (public)
# ------------------------
class TutorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tutor.objects.filter(is_active=True)
    serializer_class = TutorSerializer
    permission_classes = [AllowAny]
    pagination_class = None




# ------------------------
# Public Demo Slots API
# ------------------------

# @api_view(['GET'])
# @permission_classes([AllowAny])
# def public_demo_slots(request):

#     tutor_id = request.GET.get("tutor_id")

#     today = timezone.localdate()

#     slots = ClassSchedule.objects.filter(
#         is_demo=True,
#         student__isnull=True,
#         date__gte=today
#     )

#     if tutor_id:
#         slots = slots.filter(tutor_id=tutor_id)

#     slots = slots.order_by("date", "start_time")

#     serializer = ClassScheduleSerializer(slots, many=True)

#     return Response(serializer.data)\


# @api_view(['GET'])
# @permission_classes([AllowAny])
# def public_demo_slots(request):

#     tutor_id = request.GET.get("tutor_id")

#     today = timezone.localdate()

#     # All booked slot ids
#     booked_slot_ids = Booking.objects.filter(
#         status=Booking.STATUS_BOOKED,
#         slot__isnull=False
#     ).values_list("slot_id", flat=True)

#     slots = ClassSchedule.objects.filter(
#         is_demo=True,
#         date__gte=today
#     ).exclude(
#         id__in=booked_slot_ids
#     )

#     if tutor_id:
#         slots = slots.filter(tutor_id=tutor_id)

#     slots = slots.order_by("date", "start_time")

#     serializer = ClassScheduleSerializer(slots, many=True)

#     return Response(serializer.data)

@api_view(["GET"])
@permission_classes([AllowAny])
def public_demo_slots(request):

    tutor_id = request.GET.get("tutor_id")

    today = timezone.localdate()

    booked_slot_ids = Booking.objects.filter(
        status=Booking.STATUS_BOOKED,
        slot__isnull=False
    ).values_list("slot_id", flat=True)

    slots = ClassSchedule.objects.filter(
        is_demo=True,
        date__gte=today
    ).exclude(
        id__in=booked_slot_ids
    )

    if tutor_id:
        tutor = Tutor.objects.filter(id=tutor_id).first()

        if tutor:
            slots = slots.filter(tutor=tutor.user)
        else:
            slots = ClassSchedule.objects.none()

    slots = slots.order_by("date", "start_time")

    serializer = ClassScheduleSerializer(slots, many=True)

    return Response(serializer.data)