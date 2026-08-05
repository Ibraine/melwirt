from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import ClassSchedule
from courses.models import CourseSession, StudentSessionProgress
from assignment.models import AssignmentSubmission

User = get_user_model()


# =========================
# USER MINI SERIALIZER
# =========================
class UserMiniSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("id", "email", "name", "profile_image")

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()

    def get_profile_image(self, obj):
        request = self.context.get("request")
        if obj.profile_image and request:
            return request.build_absolute_uri(obj.profile_image.url)
        return None


# =========================
# MAIN SCHEDULE SERIALIZER
# =========================
class ClassScheduleSerializer(serializers.ModelSerializer):

    tutor_detail = UserMiniSerializer(source="tutor", read_only=True)
    student_detail = UserMiniSerializer(source="student", read_only=True)

    course_title = serializers.CharField(source="course.title", read_only=True)
    module_title = serializers.CharField(source="module.title", read_only=True)
    session_title = serializers.CharField(source="session.title", read_only=True)

    total_sessions = serializers.SerializerMethodField()
    completed_sessions = serializers.SerializerMethodField()
    assignment_status = serializers.SerializerMethodField()

    image_url = serializers.SerializerMethodField()
    tutor_image = serializers.SerializerMethodField()

    class Meta:
        model = ClassSchedule
        fields = [
            "id",
            "tutor",
            "tutor_detail",
            "student",
            "student_detail",
            "course",
            "course_title",
            "module",
            "module_title",
            "session",
            "session_title",
            "date",
            "start_time",
            "end_time",
            "is_demo",
            "meet_link",
            "created_at",

            "total_sessions",
            "completed_sessions",
            "assignment_status",

            "image_url",
            "tutor_image",
        ]

    # =========================
    # TOTAL SESSIONS
    # =========================
    def get_total_sessions(self, obj):
        return CourseSession.objects.filter(
            module__course=obj.course
        ).count()

    # =========================
    # COMPLETED SESSIONS
    # =========================
    def get_completed_sessions(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return 0

        return StudentSessionProgress.objects.filter(
            student=request.user,
            session__module__course=obj.course,
            is_completed=True
        ).count()

    # =========================
    # ASSIGNMENT STATUS
    # =========================
    def get_assignment_status(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return "PENDING"

        submission = AssignmentSubmission.objects.filter(
            student=request.user,
            assignment__course=obj.course
        ).order_by("-submitted_at").first()

        if not submission:
            return "PENDING"

        return submission.status

    # =========================
    # COURSE IMAGE
    # =========================
    def get_image_url(self, obj):
        request = self.context.get("request")

        if obj.course and obj.course.image and request:
            return request.build_absolute_uri(obj.course.image.url)

        return None

    # =========================
    # TUTOR IMAGE
    # =========================
    def get_tutor_image(self, obj):
        request = self.context.get("request")

        if obj.tutor and obj.tutor.profile_image and request:
            return request.build_absolute_uri(obj.tutor.profile_image.url)

        return None
# from rest_framework import serializers
# from django.contrib.auth import get_user_model
# from .models import ClassSchedule
# from courses.models import CourseModule, CourseSession, CourseSession,StudentSessionProgress
# from accounts.models import User
# from assignment.models import AssignmentSubmission


# User = get_user_model()


# class UserMiniSerializer(serializers.ModelSerializer):
#     name = serializers.SerializerMethodField()

#     class Meta:
#         model = User
#         fields = ("id", "email", "name")

#     def get_name(self, obj):
#         return f"{obj.first_name} {obj.last_name}".strip()


# class ClassScheduleSerializer(serializers.ModelSerializer):
#     tutor_detail = UserMiniSerializer(source="tutor", read_only=True)
#     student_detail = UserMiniSerializer(source="student", read_only=True)
#     course_title = serializers.CharField(source="course.title", read_only=True)
#     module_title = serializers.CharField(source="module.title", read_only=True)
#     session_title = serializers.CharField(source="session.title", read_only=True)
#     total_sessions = serializers.SerializerMethodField()
#     completed_sessions = serializers.SerializerMethodField()
#     assignment_status = serializers.SerializerMethodField()
#     image_url = serializers.SerializerMethodField()
#     tutor_image = serializers.SerializerMethodField()
   




#     class Meta:
#         model = ClassSchedule
#         fields = [
#             "id",
#             "tutor",
#             "tutor_detail",
#             "student",
#             "student_detail",
#             "course",
#             "course_title",
#             "module",
#             "module_title",
#             "session",
#             "session_title",
#             "date",
#             "start_time",
#             "end_time",
#             "is_demo",
#             "meet_link",
#             "created_at",
#             "total_sessions",
#             "completed_sessions",
#             "assignment_status",
#             "image_url",
#             "tutor_image",
        
        
#         ]




#         read_only_fields = (
#             "tutor",
#             "student",
#             "tutor_detail",
#             "student_detail",
#             "course_title",
#             "module_title",
#             "session_title",
#             "created_at",
#         )

#     def get_total_sessions(self, obj):
#         return CourseSession.objects.filter(
#         module__course=obj.course
#     ).count()


#     def get_completed_sessions(self, obj):
#         request = self.context.get("request")

#         if not request or not request.user.is_authenticated:
#            return 0

#         return StudentSessionProgress.objects.filter(
#             student=request.user,
#             session__module__course=obj.course,
#             is_completed=True
#     ).count()

#     def get_assignment_status(self, obj):
#         request = self.context.get("request")

#         if not request or not request.user.is_authenticated:
#             return "PENDING"

#         submission = AssignmentSubmission.objects.filter(
#             student=request.user,
#             assignment__course=obj
#         ).order_by("-submitted_at").first()

#         if not submission:
#             return "PENDING"

#         return submission.status


#     def get_image_url(self, obj):
#         request = self.context.get("request")
 
#         if obj.image and request:
#           return request.build_absolute_uri(obj.image.url)

#         return None


# =============================
# ADMIN SCHEDULE SERIALIZER
# =============================
class AdminScheduleSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(
        source="course.title",
        read_only=True
    )

    course_image = serializers.ImageField(
        source="course.thumbnail",
        read_only=True
    )

    tutor_name = serializers.SerializerMethodField()
    student_name = serializers.SerializerMethodField()

    class Meta:
        model = ClassSchedule
        fields = [
            "id",
            "course",
            "course_title",
            "course_image",
            "tutor",
            "tutor_name",
            "student",
            "student_name",
            "date",
            "start_time",
            "end_time",
            "is_demo",
            "meet_link",
        ]

    def get_tutor_name(self, obj):
        if obj.tutor:
            return f"{obj.tutor.first_name} {obj.tutor.last_name}"
        return None

    def get_student_name(self, obj):
        if obj.student:
            return f"{obj.student.first_name} {obj.student.last_name}"
        return None


class CreateScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassSchedule
        fields = [
            "tutor", 
            "course",
            "module",
            "session",
            "date",
            "start_time",
            "end_time",
            "is_demo",
            "meet_link",
            "student",  
        
        ]
