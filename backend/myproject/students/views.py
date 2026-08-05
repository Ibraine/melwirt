# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from django.utils.timezone import now
# from django.db.models import F, ExpressionWrapper, DurationField, Sum

# from enrollments.models import Enrollment
# from courses.models import Course
# from schedules.models import ClassSchedule as Schedule

# class StudentDashboardAPIView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user

#         if user.role != "student":
#             return Response({"detail": "Unauthorized"}, status=403)

#         # ======================
#         # Enrollments
#         # ======================
#         enrollments = Enrollment.objects.filter(student=user)
#         total_enroll_courses = enrollments.count()
#         ongoing_courses = enrollments.filter(status="ongoing").count()

#         # ======================
#         # Hours Spent (calculated from start_time & end_time)
#         # ======================
#         total_duration = Schedule.objects.filter(
#             student=user,
#             end_time__lt=now()
#         ).annotate(
#             duration=ExpressionWrapper(F('end_time') - F('start_time'), output_field=DurationField())
#         ).aggregate(total=Sum('duration'))['total'] or 0

#         # Convert duration to hours (float)
#         total_hours = total_duration.total_seconds() / 3600 if total_duration else 0

#         # ======================
#         # Active Courses
#         # ======================
#         active_courses = enrollments.filter(status="ongoing").select_related("course")
#         active_courses_data = [
#             {
#                 "id": e.course.id,
#                 "title": e.course.title,
#                 "thumbnail": e.course.thumbnail.url if e.course.thumbnail else None,
#                 "tutor_name": e.course.tutor.name
#             }
#             for e in active_courses
#         ]

#         # ======================
#         # Upcoming Schedule
#         # ======================
#         upcoming_class = Schedule.objects.filter(
#             student=user,
#             start_time__gt=now()
#         ).order_by("start_time").first()

#         upcoming_data = None
#         if upcoming_class:
#             upcoming_data = {
#                 "course_title": upcoming_class.course.title,
#         "date": upcoming_class.date,                 # ✅ DateField
#         "start_time": upcoming_class.start_time,     # ✅ TimeField
#         "end_time": upcoming_class.end_time,         # ✅ TimeField
#         "join_link": upcoming_class.meet_link
#             }

#         return Response({
#             "stats": {
#                 "total_enroll_courses": total_enroll_courses,
#                 "ongoing_courses": ongoing_courses,
#                 "hours_spent": round(total_hours, 2)  # rounded to 2 decimals
#             },
#             "active_courses": active_courses_data,
#             "upcoming_schedule": upcoming_data
#         })


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from django.utils.timezone import now
# from django.db.models import F, ExpressionWrapper, DurationField, Sum

# from enrollments.models import Enrollment
# from schedules.models import ClassSchedule as Schedule


# class StudentDashboardAPIView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user

#         if user.role != "student":
#             return Response({"detail": "Unauthorized"}, status=403)

#         # ======================
#         # Enrollments
#         # ======================
#         enrollments = Enrollment.objects.filter(student=user)

#         total_enroll_courses = enrollments.exclude(
#             status="cancelled"
#         ).count()

#         ongoing_courses = enrollments.filter(
#             status__in=["active", "pending"]
#         ).count()

#         # ======================
#         # Hours Spent
#         # ======================
#         total_duration = Schedule.objects.filter(
#             student=user,
#             end_time__lt=now()
#         ).annotate(
#             duration=ExpressionWrapper(
#                 F("end_time") - F("start_time"),
#                 output_field=DurationField()
#             )
#         ).aggregate(total=Sum("duration"))["total"]

#         total_hours = (
#             total_duration.total_seconds() / 3600
#             if total_duration else 0
#         )

#         # ======================
#         # Active Courses
#         # ======================
#         active_courses = enrollments.filter(
#             status__in=["active", "pending"]
#         ).select_related("course")

#         # active_courses_data = [
#         #     {
#         #         "id": e.course.id,
#         #         "title": e.course.title,
#         #         "thumbnail": e.course.image.url if hasattr(e.course, "image") and e.course.image else None,
#         #         "tutor_name": None,
#         #     }
#         #     for e in active_courses
#         # ]
#         active_courses_data = [
#     {
#         "id": e.id,
#         "course_id": e.course.id,
#         "title": e.course.title,
#         "thumbnail": (
#             e.course.thumbnail.url
#             if hasattr(e.course, "thumbnail") and e.course.thumbnail
#             else None
#         ),
#         "tutor_name": (
#             f"{e.course.tutor.first_name} {e.course.tutor.last_name}".strip()
#             if e.course.tutor and e.course.tutor.first_name
#             else e.course.tutor.username
#         ),
#     }
#     for e in active_courses
# ]


#         # ======================
#         # Upcoming Schedule
#         # ======================
#         upcoming_class = Schedule.objects.filter(
#             student=user,
#             start_time__gt=now()
#         ).order_by("start_time").first()

#         upcoming_data = None
#         if upcoming_class:
#             upcoming_data = {
#                 "course_title": upcoming_class.course.title,
#                 "date": upcoming_class.date,
#                 "start_time": upcoming_class.start_time,
#                 "end_time": upcoming_class.end_time,
#                 "join_link": upcoming_class.meet_link,
#             }

#         return Response({
#             "stats": {
#                 "total_enroll_courses": total_enroll_courses,
#                 "ongoing_courses": ongoing_courses,
#                 "hours_spent": round(total_hours, 2)
#             },
#             "active_courses": active_courses_data,
#             "upcoming_schedule": upcoming_data
#         })



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.utils import timezone
from django.db.models import F, ExpressionWrapper, DurationField, Sum
from datetime import datetime

from enrollments.models import Enrollment
from schedules.models import ClassSchedule as Schedule


class StudentDashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role != "student":
            return Response({"detail": "Unauthorized"}, status=403)

        # ======================
        # ENROLLMENTS
        # ======================
        enrollments = Enrollment.objects.filter(student=user)

        total_enroll_courses = enrollments.exclude(
            status="cancelled"
        ).count()

        ongoing_courses = enrollments.filter(
            status__in=["active", "pending"]
        ).count()

        # ======================
        # HOURS SPENT
        # ======================
        total_duration = Schedule.objects.filter(
            student=user,
            end_time__lt=timezone.now()
        ).annotate(
            duration=ExpressionWrapper(
                F("end_time") - F("start_time"),
                output_field=DurationField()
            )
        ).aggregate(total=Sum("duration"))["total"]

        total_hours = (
            total_duration.total_seconds() / 3600
            if total_duration else 0
        )

        # ======================
        # ACTIVE COURSES
        # ======================
        active_courses = enrollments.filter(
            status__in=["active", "pending"]
        ).select_related("course")

        active_courses_data = [
            {
                "id": e.id,
                "course_id": e.course.id,
                "title": e.course.title,
                "thumbnail": (
                    e.course.thumbnail.url
                    if hasattr(e.course, "thumbnail") and e.course.thumbnail
                    else None
                ),
                "tutor_name": (
                    f"{e.course.tutor.first_name} {e.course.tutor.last_name}".strip()
                    if e.course.tutor and e.course.tutor.first_name
                    else e.course.tutor.username
                ),
            }
            for e in active_courses
        ]

        # ======================
        # 🔥 UPCOMING CLASSES FIX
        # ======================
        now_dt = timezone.localtime()

        all_classes = Schedule.objects.filter(
            student=user
        ).select_related("course")

        def is_future(slot):
            slot_dt = timezone.make_aware(
                datetime.combine(slot.date, slot.start_time)
            )
            return slot_dt >= now_dt

        upcoming_classes = [c for c in all_classes if is_future(c)]

        # 🔥 SPLIT DEMO & REGULAR
        demo_class = next((c for c in upcoming_classes if c.is_demo), None)
        regular_class = next((c for c in upcoming_classes if not c.is_demo), None)

        def format_class(c):
            if not c:
                return None
            return {
                "course_title": c.course.title,
                "date": c.date,
                "start_time": c.start_time,
                "end_time": c.end_time,
                "join_link": c.meet_link,
                "is_demo": c.is_demo,
            }

        # ======================
        # FINAL RESPONSE
        # ======================
        return Response({
            "stats": {
                "total_enroll_courses": total_enroll_courses,
                "ongoing_courses": ongoing_courses,
                "hours_spent": round(total_hours, 2),
            },
            "active_courses": active_courses_data,

            # 🔥 IMPORTANT (NEW)
            "upcoming_demo": format_class(demo_class),
            "upcoming_regular": format_class(regular_class),
        })