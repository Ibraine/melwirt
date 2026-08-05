from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAdminUser
from rest_framework.permissions import AllowAny
from enrollments.models import Enrollment


from .models import Course, CourseModule, CourseSession,StudentSessionProgress,SessionSummary, SessionContent
from .serializers import CourseSerializer, CourseModuleSerializer,EnrolledStudentSerializer

User = get_user_model()


# ==================================================
# COURSE LIST (ADMIN / TUTOR / STUDENT)
# ==================================================
class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "admin":
            return Course.objects.all().order_by("-created_at")

        elif user.role == "tutor":
            return Course.objects.filter(
                tutor=user, is_active=True
            ).order_by("-created_at")

        return Course.objects.filter(
            is_active=True
        ).order_by("-created_at")

       # ✅ ADD THIS FUNCTION (VERY IMPORTANT)
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
    

# ==================================================
# TUTOR LIST (ADMIN USE)
# ==================================================
class TutorListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        tutors = User.objects.filter(role="tutor")
        return Response([
            {"id": t.id, "name": getattr(t, "name", t.username)}
            for t in tutors
        ])


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Course


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def tutor_by_course(request, course_id):
    try:
        course = Course.objects.select_related("tutor").get(id=course_id)

        if not course.tutor:
            return Response({"tutor": None})

        tutor = course.tutor

        return Response({
            "id": tutor.id,
            "name": f"{tutor.first_name} {tutor.last_name}",
            "email": tutor.email
        })

    except Course.DoesNotExist:
        return Response({"detail": "Course not found"}, status=404)



# ==================================================
# STUDENT : MY COURSES (PURCHASED)   closed  currently use in enrollment ...
# ==================================================
# class StudentMyCoursesView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         if request.user.role != "student":
#             return Response(
#                 {"detail": "Only students allowed"},
#                 status=403
#             )

#         courses = Course.objects.filter(
#             enrolled_students=request.user,
#             is_active=True
#         ).order_by("-created_at")

#         serializer = CourseSerializer(
#             courses,
#             many=True,
#             context={"request": request}
#         )
#         return Response(serializer.data)


# ==================================================
# COURSE CONTENT (STUDENT SAFE + LOCKING LOGIC)
# ==================================================
# class CourseContentView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request, course_id):
#         course = get_object_or_404(Course, id=course_id)

#         user = request.user
#         is_enrolled = False

#         if user.role == "student":
#             is_enrolled = course.enrolled_students.filter(
#                 id=user.id
#             ).exists()

#         modules = CourseModule.objects.filter(
#             course=course
#         ).order_by("order")

#         response_data = []

#         for module in modules:
#             sessions = CourseSession.objects.filter(
#                 module=module
#             ).order_by("order")

#             session_list = []
#             for session in sessions:
#                 session_list.append({
#                     "id": session.id,
#                     "title": session.title,
#                     "order": session.order,
#                     "is_completed": False,   # future use
#                     "is_locked": not is_enrolled
#                 })

#             response_data.append({
#                 "id": module.id,
#                 "title": module.title,
#                 "order": module.order,
#                 "is_locked": not is_enrolled,
#                 "sessions": session_list
#             })

#         return Response(response_data)
class CourseContentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, course_id):

        course = get_object_or_404(Course, id=course_id)
        user = request.user

        is_enrolled = False

        if user.role == "student":
            is_enrolled = course.enrolled_students.filter(id=user.id).exists()

        modules = CourseModule.objects.filter(course=course).order_by("order")

        response_data = []

        previous_module_completed = True

        for module in modules:

            module_locked = not previous_module_completed

            sessions = CourseSession.objects.filter(module=module).order_by("order")

            session_list = []

            previous_session_completed = True

            module_completed = True

            for session in sessions:

                is_completed = False

                if user.role == "student":
                    is_completed = StudentSessionProgress.objects.filter(
                        student=user,
                        session=session,
                        is_completed=True
                    ).exists()

                session_locked = not previous_session_completed or module_locked

                if not is_completed:
                    module_completed = False

                session_list.append({
                    "id": session.id,
                    "title": session.title,
                    "order": session.order,
                    "is_completed": is_completed,
                    "is_locked": session_locked or not is_enrolled
                })

                previous_session_completed = is_completed

            response_data.append({
                "id": module.id,
                "title": module.title,
                "order": module.order,
                "is_locked": module_locked or not is_enrolled,
                "sessions": session_list
            })

            previous_module_completed = module_completed

        return Response(response_data)


# ==================================================
# ADMIN ONLY : CREATE MODULE
# ==================================================
class AdminCreateModuleView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        course_id = request.data.get("course")
        title = request.data.get("title")
        order = request.data.get("order")

        if not course_id or not title or not str(order).isdigit():
            return Response(
                {"detail": "Course, title and order required"},
                status=400
            )

        course = get_object_or_404(Course, id=course_id)

        if CourseModule.objects.filter(
            course=course, order=order
        ).exists():
            return Response(
                {"detail": "Module order already exists"},
                status=400
            )

        module = CourseModule.objects.create(
            course=course,
            title=title,
            order=order
        )

        return Response(
            {"id": module.id, "message": "Module created"},
            status=201
        )


# ==================================================
# ADMIN ONLY : CREATE SESSION
# ==================================================
class AdminCreateSessionView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        module_id = request.data.get("module")
        title = request.data.get("title")
        description = request.data.get("description") 
        order = request.data.get("order")
        duration = request.data.get("duration_minutes", 30)

        if not module_id or not title or not str(order).isdigit():
            return Response(
                {"detail": "Module, title and order required"},
                status=400
            )

        module = get_object_or_404(CourseModule, id=module_id)

        if CourseSession.objects.filter(
            module=module, order=order
        ).exists():
            return Response(
                {"detail": "Session order already exists"},
                status=400
            )

        session = CourseSession.objects.create(
            module=module,
            title=title,
            description=description, 
            order=order,
            duration_minutes=duration
        )

        return Response(
            {"id": session.id, "message": "Session created"},
            status=201
        )



# ==================================================
# STUDENT LIST (for dropdown in client panel)
# ==================================================
class StudentListView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # optional: client/tutor only

    def get(self, request):
        students = User.objects.filter(role="student")
        return Response([
            {"id": s.id, "name": f"{s.first_name} {s.last_name} ({s.email})"}
            for s in students
        ])



# ==================================================
# PUBLIC COURSES (DEMO BOOKING PAGE)
# ==================================================

@api_view(["GET"])
@permission_classes([AllowAny])
def public_courses(request):

    courses = Course.objects.filter(is_active=True).order_by("title")

    serializer = CourseSerializer(
        courses,
        many=True,
        context={"request": request}
    )

    return Response(serializer.data)



# ==================================================
# ENROLL STUDENTS (client panel)
# ==================================================
class EnrollStudentsView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # optional: client/tutor only

    def post(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)
        student_ids = request.data.get("student_ids", [])

        if not isinstance(student_ids, list):
            return Response({"detail": "student_ids should be a list"}, status=400)

        students = User.objects.filter(id__in=student_ids, role="student")
        for student in students:
            course.enrolled_students.add(student)

        # optional: return updated enrolled students
        serializer = EnrolledStudentSerializer(course.enrolled_students.all(), many=True)
        return Response({"detail": "Students enrolled successfully", "enrolled_students": serializer.data})


# ==================================================
# ADMIN ONLY : UPDATE STUDENT SESSION PROGRESS
# (Same power as Django Admin checkbox)
# ==================================================
class AdminUpdateSessionProgressView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        student_id = request.data.get("student_id")
        session_id = request.data.get("session_id")
        is_completed = request.data.get("is_completed", False)

        if not student_id or not session_id:
            return Response(
                {"detail": "student_id and session_id required"},
                status=400
            )

        progress, created = StudentSessionProgress.objects.get_or_create(
            student_id=student_id,
            session_id=session_id
        )

        progress.is_completed = bool(is_completed)
        progress.save()

        return Response({
            "message": "Session progress updated successfully",
            "is_completed": progress.is_completed
        })



# ==================================================
# ADMIN COURSE STUDENT PROGRESS API
# ==================================================

from rest_framework.decorators import api_view, permission_classes

@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_course_student_progress(request, course_id, student_id):

    total_sessions = CourseSession.objects.filter(
        module__course_id=course_id
    ).count()

    if total_sessions == 0:
        return Response({"progress": 0})

    completed = StudentSessionProgress.objects.filter(
        student_id=student_id,
        session__module__course_id=course_id,
        is_completed=True
    ).count()

    progress = int((completed / total_sessions) * 100)

    return Response({"progress": progress})




# ==================================================
# PUBLIC TUTORS (DEMO BOOKING PAGE)
# ==================================================

@api_view(["GET"])
@permission_classes([AllowAny])
def public_tutors(request):

    course_id = request.GET.get("course_id")

    if not course_id:
        return Response({"detail": "course_id required"}, status=400)

    try:
        course = Course.objects.select_related("tutor").get(
            id=course_id,
            is_active=True
        )

        tutor = course.tutor

        if not tutor:
            return Response([])

        return Response([
            {
                "id": tutor.id,
                "name": f"{tutor.first_name} {tutor.last_name}".strip(),
                "email": tutor.email
            }
        ])

    except Course.DoesNotExist:
        return Response([], status=404)
    





class MyClassesAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        # only student allowed
        if user.role != "student":
            return Response(
                {"detail": "Only students allowed"},
                status=403
            )

        courses = Course.objects.filter(
            enrolled_students=user,
            is_active=True
        ).prefetch_related(
            "modules__sessions"
        )

        serializer = CourseSerializer(
            courses,
            many=True,
            context={"request": request}
        )

        return Response(serializer.data)


class AddSessionSummaryAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):

        # 🔐 SECURITY CHECK
        if request.user.role not in ["admin", "tutor"]:
            return Response({"detail": "Not allowed"}, status=403)

        session_id = request.data.get("session_id")
        student_id = request.data.get("student_id")
        summary_text = request.data.get("summary")

        if not session_id or not student_id or not summary_text:
            return Response(
                {"detail": "session_id, student_id, summary required"},
                status=400
            )

        session = get_object_or_404(CourseSession, id=session_id)
        student = get_object_or_404(User, id=student_id)
        # 🔐 TUTOR CAN ONLY MODIFY HIS OWN COURSE
        if request.user.role == "tutor" and session.module.course.tutor != request.user:
             return Response({"detail": "Not your course"}, status=403)


        summary_obj, created = SessionSummary.objects.update_or_create(
            session=session,
            student=student,  # ✅ FIXED
            defaults={
                "tutor": request.user if request.user.role == "tutor" else None,
                "summary": summary_text,
            }
        )

        return Response({
            "message": "Summary saved successfully",
            "summary": summary_obj.summary
        })

class AddSessionContentAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):

        # 🔐 SECURITY CHECK (ADD THIS)
        if request.user.role not in ["admin", "tutor"]:
            return Response({"detail": "Not allowed"}, status=403)

        session_id = request.data.get("session_id")
        recording_url = request.data.get("recording_url")
        project_video_url = request.data.get("project_video_url")

        if not session_id:
            return Response(
                {"detail": "session_id required"},
                status=400
            )

        session = get_object_or_404(CourseSession, id=session_id)
        # 🔐 SECURITY
        if request.user.role == "tutor" and session.module.course.tutor != request.user:
             return Response({"detail": "Not your course"}, status=403)


        content_obj, created = SessionContent.objects.update_or_create(
            session=session,
            defaults={
                "recording_url": recording_url,
                "project_video_url": project_video_url,
            }
        )

        return Response({
            "message": "Content saved successfully",
            "recording_url": content_obj.recording_url,
            "project_video_url": content_obj.project_video_url,
        })
    





class SessionDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, session_id):

        session = get_object_or_404(CourseSession, id=session_id)
        user = request.user

        # ❌ only student allowed
        if user.role != "student":
            return Response({"detail": "Only students allowed"}, status=403)

        # ❌ check enrollment
        # if not session.module.course.enrolled_students.filter(id=user.id).exists():
        #     return Response({"detail": "Not enrolled"}, status=403)
        
        if not Enrollment.objects.filter(
            student=user,
            course=session.module.course,
            status__in=["active", "pending"]
        ).exists():
            return Response({"detail": "Not enrolled"}, status=403)

        # ✅ completion status
        is_completed = StudentSessionProgress.objects.filter(
            student=user,
            session=session,
            is_completed=True
        ).exists()

        # ✅ summary (student specific)
        summary_obj = SessionSummary.objects.filter(
            session=session,
            student=user
        ).first()

        # ✅ content (same for all)
        content_obj = SessionContent.objects.filter(
            session=session
        ).first()

        return Response({
            "session": {
                "id": session.id,
                "title": session.title,
                "description": session.description,
                "duration_minutes": session.duration_minutes,
                "order": session.order
            },
            "is_completed": is_completed,
            "summary": summary_obj.summary if summary_obj else None,
            "recording_url": content_obj.recording_url if content_obj else None,
            "project_video_url": content_obj.project_video_url if content_obj else None
        })