from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ScheduleViewSet

router = DefaultRouter()
router.register(r"", ScheduleViewSet, basename="schedules")

urlpatterns = [
    path("", include(router.urls)),
]

from django.urls import path
# from .views import student_list tutor_list 
from .views import student_list, tutor_list  # yahan tutor_list import karna hoga

urlpatterns += [
    path("students/", student_list, name="student-list"),
     path("tutors/", tutor_list, name="tutor-list"),  # 
]


