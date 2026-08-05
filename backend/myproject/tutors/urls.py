from django.urls import path, include
from rest_framework.routers import DefaultRouter
from schedules.views import ScheduleViewSet  # reuse schedules ViewSet
from .views import TutorCreateScheduleView, TutorDashboardView

router = DefaultRouter()
router.register(r'schedules', ScheduleViewSet, basename='tutor-schedules')

urlpatterns = [
    # Tutor schedules (all upcoming/past)
    path('', include(router.urls)),

    # Tutor create slot
    path('create-schedule/', TutorCreateScheduleView.as_view(), name='tutor-create-schedule'),

    # Tutor dashboard stats
    path('dashboard/', TutorDashboardView.as_view(), name='tutor-dashboard'),
]
