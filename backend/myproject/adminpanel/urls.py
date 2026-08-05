from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, TutorViewSet, DashboardStatsView
from schedules.views import ScheduleViewSet  # reuse existing ViewSet


router = DefaultRouter()
router.register(r'users', UserViewSet, basename='admin-users')
router.register(r'tutors', TutorViewSet, basename='admin-tutors')
router.register(r'schedules', ScheduleViewSet, basename='admin-schedules')
urlpatterns = [
    path('', include(router.urls)),
    path('dashboard-stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('enrollments/', include('enrollments.urls')),



    # 🔥 ADD THIS LINE
    path('', include('coupons.urls')),
    path('referrals/', include('referrals.urls')),
    # path('chats/', include('chats.urls')), 
    path('enrollments/', include('enrollments.urls')),

]
