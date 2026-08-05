from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import (
    CourseViewSet,
    TutorListView,
    # StudentMyCoursesView,
    CourseContentView,
    AdminCreateModuleView,
    AdminCreateSessionView,
    StudentListView, 
    EnrollStudentsView,
    AdminUpdateSessionProgressView,
    admin_course_student_progress,
    tutor_by_course,
    public_courses, 
    public_tutors,
    MyClassesAPIView,
    AddSessionSummaryAPIView, 
    AddSessionContentAPIView,
    SessionDetailAPIView




)

router = DefaultRouter()
router.register(r"courses", CourseViewSet, basename="course")

urlpatterns = [
      # ✅ PUBLIC COURSES API
    path("public/courses/", public_courses, name="public-courses"),

    
    path("tutors/", TutorListView.as_view(), name="tutor-list"),
    path("public/tutors/", public_tutors, name="public-tutors"),
   
   # ✅ NEW API
    path(
        "courses/<int:course_id>/tutor/",
        tutor_by_course,
        name="course-tutor"
    ),
   
    # path("student/courses/", StudentMyCoursesView.as_view(), name="student-courses"),
    path("admin/modules/", AdminCreateModuleView.as_view()),
    path("admin/sessions/", AdminCreateSessionView.as_view()),
    path(
    "admin/session-progress/",
    AdminUpdateSessionProgressView.as_view(),
    name="admin-session-progress"
),
    path(
    "admin/course/<int:course_id>/student/<int:student_id>/progress/",
    admin_course_student_progress,
    name="admin-course-student-progress",
),
    
    path("my-classes/", MyClassesAPIView.as_view(), name="my-classes"),
    path("session-summary/", AddSessionSummaryAPIView.as_view(), name="session-summary"),
    path("session-content/", AddSessionContentAPIView.as_view(), name="session-content"),
    path("session/<int:session_id>/", SessionDetailAPIView.as_view()),
    path("students/", StudentListView.as_view(), name="student-list"),
    path("courses/<int:course_id>/enroll/", EnrollStudentsView.as_view(), name="enroll-students"),

    path(
        "courses/<int:course_id>/content/",
        CourseContentView.as_view(),
        name="course-content",
    ),
]

urlpatterns += router.urls
