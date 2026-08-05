from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from schedules.models import ClassSchedule
from schedules.serializers import ClassScheduleSerializer, CreateScheduleSerializer
from django.utils.timezone import now
from rest_framework.response import Response
from rest_framework.views import APIView
from courses.models import Course

# ---- Tutor My Classes ----
class TutorMySchedulesView(ListAPIView):
    serializer_class = ClassScheduleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ClassSchedule.objects.filter(tutor=self.request.user)

# ---- Tutor Create Slot ----
class TutorCreateScheduleView(CreateAPIView):
    serializer_class = CreateScheduleSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(tutor=self.request.user)

# ---- Tutor Dashboard ----
# class TutorDashboardView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         today = now().date()

#         upcoming_classes = ClassSchedule.objects.filter(
#             tutor=request.user,
#             date__gte=today,
#             is_demo=False
#         )
#         demo_classes = ClassSchedule.objects.filter(
#             tutor=request.user,
#             is_demo=True
#         )
#         total_courses = Course.objects.filter(tutor=request.user).count()

#         return Response({
#             "total_courses": total_courses,
#             "upcoming_classes_count": upcoming_classes.count(),
#             "demo_classes_count": demo_classes.count(),
#             "upcoming_classes": ClassScheduleSerializer(upcoming_classes, many=True).data,
#             "demo_classes": ClassScheduleSerializer(demo_classes, many=True).data
#         })

class TutorDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = now().date()

        regular_classes = ClassSchedule.objects.filter(
            tutor=request.user,
            date__gte=today,
            is_demo=False
        ).order_by("date", "start_time")

        demo_classes = ClassSchedule.objects.filter(
            tutor=request.user,
            date__gte=today,
            is_demo=True
        ).order_by("date", "start_time")

        total_courses = Course.objects.filter(tutor=request.user).count()

        return Response({
            "total_courses": total_courses,
            "upcoming_classes_count": regular_classes.count(),
            "regular_classes": ClassScheduleSerializer(
                regular_classes, many=True
            ).data,
            "demo_classes": ClassScheduleSerializer(
                demo_classes, many=True
            ).data,
        })
