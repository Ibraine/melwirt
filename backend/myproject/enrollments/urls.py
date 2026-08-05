from django.urls import path
from .views import (
    EnrollmentListCreateAdminAPIView,
    EnrollmentRetrieveUpdateDestroyAdminAPIView,
    StudentEnrollmentListAPIView,
    StudentMyCoursesAPIView

)

urlpatterns = [
    # Admin
    path("", EnrollmentListCreateAdminAPIView.as_view(), name="admin-enrollments"),
    path("<int:pk>/", EnrollmentRetrieveUpdateDestroyAdminAPIView.as_view(), name="admin-enrollment-detail"),
    
    # Student
    path("student/", StudentEnrollmentListAPIView.as_view(), name="student-enrollments"),
    path("student/my-courses/", StudentMyCoursesAPIView.as_view()),
]
