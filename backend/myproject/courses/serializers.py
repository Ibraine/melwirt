from rest_framework import serializers
from .models import (
    Course,
    CourseModule,
    CourseSession,
    StudentSessionProgress,
)
from accounts.models import User
from assignment.models import AssignmentSubmission

# =========================
# ENROLLED STUDENT (NESTED)
# =========================
class EnrolledStudentSerializer(serializers.ModelSerializer):
    # profile_pic = serializers.ImageField(source="image", read_only=True)
    profile_pic = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "profile_pic"]
    
    def get_profile_pic(self, obj):
        request = self.context.get("request")

        if obj.profile_image and request:
            return request.build_absolute_uri(obj.profile_image.url)

        return None

# =========================
# COURSE SERIALIZER
# =========================
class CourseSerializer(serializers.ModelSerializer):
    tutor_name = serializers.SerializerMethodField()
    students_count = serializers.SerializerMethodField()
    enrolled_students = EnrolledStudentSerializer(many=True, read_only=True)
    total_sessions = serializers.SerializerMethodField()
    completed_sessions = serializers.SerializerMethodField()
    assignment_status = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    tutor_image = serializers.SerializerMethodField()
   


    # 🔥 NEW
    # progress = serializers.SerializerMethodField()
   
    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "tutor",
            "tutor_name",
            "duration_weeks",
            "level",
            "price_inr",
            "price_usd",
            "image",
            "is_active",
            "created_at",
            "students_count",
            "enrolled_students",
            # "progress",  # 👈 student progress %
            "total_sessions",
            "completed_sessions",
            "assignment_status",
            "image_url",
            "tutor_image",


            
    
    
                 ]
    def get_total_sessions(self, obj):
        return CourseSession.objects.filter(
        module__course=obj
        ).count()


    def get_completed_sessions(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return 0

        return StudentSessionProgress.objects.filter(
        student=request.user,
        session__module__course=obj,
        is_completed=True
        ).count()
    

    def get_assignment_status(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return "PENDING"

        submission = AssignmentSubmission.objects.filter(
            student=request.user,
            assignment__course=obj
        ).order_by("-submitted_at").first()

        if not submission:
            return "PENDING"

        return submission.status


    def get_image_url(self, obj):
        request = self.context.get("request")
 
        if obj.image and request:
          return request.build_absolute_uri(obj.image.url)

        return None


    def get_tutor_image(self, obj):
        request = self.context.get("request")
   
        if obj.tutor and obj.tutor.profile_image and request:
          return request.build_absolute_uri(obj.tutor.profile_image.url)

        return None
    
    
    # -------------------------
    # TUTOR NAME
    # -------------------------
    def get_tutor_name(self, obj):
        if obj.tutor:
            full_name = f"{obj.tutor.first_name} {obj.tutor.last_name}".strip()
            return full_name if full_name else obj.tutor.username
        return "No Tutor Assigned"

    # -------------------------
    # TOTAL STUDENTS
    # -------------------------
    def get_students_count(self, obj):
        return obj.enrolled_students.count()

    # # -------------------------
    # # STUDENT COURSE PROGRESS %
    # # -------------------------
    # def get_progress(self, obj):
    #     request = self.context.get("request")

    #     if not request or not request.user.is_authenticated:
    #         return 0

    #     user = request.user

    #     # total sessions in this course
    #     total_sessions = CourseSession.objects.filter(
    #         module__course=obj
    #     ).count()

    #     if total_sessions == 0:
    #         return 0

    #     completed_sessions = StudentSessionProgress.objects.filter(
    #         student=user,
    #         session__module__course=obj,
    #         is_completed=True
    #     ).count()

    #     return int((completed_sessions / total_sessions) * 100)


# =========================
# SESSION SERIALIZER (STUDENT VIEW)
# =========================
# class CourseSessionSerializer(serializers.ModelSerializer):
#     is_completed = serializers.SerializerMethodField()

#     class Meta:
#         model = CourseSession
#         fields = [
#             "id",
#             "title",
#             "description",
#             "order",
#             "duration_minutes",
#             "is_completed",
#         ]

#     def get_is_completed(self, obj):
#         request = self.context.get("request")
#         if not request or not request.user.is_authenticated:
#             return False

#         return StudentSessionProgress.objects.filter(
#             student=request.user,
#             session=obj,
#             is_completed=True
#         ).exists()


class CourseSessionSerializer(serializers.ModelSerializer):
    is_completed = serializers.SerializerMethodField()
    class_no = serializers.SerializerMethodField()
    summary = serializers.SerializerMethodField()
    recording_url = serializers.SerializerMethodField()
    project_video_url = serializers.SerializerMethodField()

    class Meta:
        model = CourseSession
        fields = [
            "id",
            "title",
            "description",
            "order",
            "duration_minutes",
            "is_completed",
            "class_no",
            "summary",
            "recording_url",
            "project_video_url",
        ]

    # ✅ completed
    def get_is_completed(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return False

        return StudentSessionProgress.objects.filter(
            student=request.user,
            session=obj,
            is_completed=True
        ).exists()

    # ✅ class number (25/70)
    def get_class_no(self, obj):
        return obj.get_class_number()

    # ✅ summary
    def get_summary(self, obj):
        try:
            return obj.summary_obj.summary
        except:
            return None

    # ✅ recording video
    def get_recording_url(self, obj):
        try:
            return obj.content_obj.recording_url
        except:
            return None

    # ✅ project video
    def get_project_video_url(self, obj):
        try:
            return obj.content_obj.project_video_url
        except:
            return None


# =========================
# MODULE SERIALIZER
# =========================
# class CourseModuleSerializer(serializers.ModelSerializer):
#     # sessions = CourseSessionSerializer(many=True, read_only=True)
#     sessions = CourseSessionSerializer(
#     many=True,
#     read_only=True,
#     context={"request": self.context.get("request")}
# )
#     class Meta:
#         model = CourseModule
#         fields = [
#             "id",
#             "title",
#             "order",
#             "sessions",
#         ]



class CourseModuleSerializer(serializers.ModelSerializer):
    sessions = serializers.SerializerMethodField()  # use method instead of direct nested

    class Meta:
        model = CourseModule
        fields = [
            "id",
            "title",
            "order",
            "sessions",
        ]

    def get_sessions(self, obj):
        # self.context available here
        return CourseSessionSerializer(
            obj.sessions.all(),  # fetch related sessions
            many=True,
            context=self.context  # ✅ correct
        ).data