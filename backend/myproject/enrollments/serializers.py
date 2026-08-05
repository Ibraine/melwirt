from rest_framework import serializers
from .models import Enrollment, EnrollmentSession
from courses.models import CourseSession, StudentSessionProgress


class EnrollmentSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnrollmentSession
        fields = "__all__"


class EnrollmentSerializer(serializers.ModelSerializer):
    sessions = EnrollmentSessionSerializer(many=True, read_only=True)

    student_name = serializers.SerializerMethodField()
    student_email = serializers.CharField(source="student.email", read_only=True)

    # ✅ SAFE COURSE FIELDS
    course_id = serializers.IntegerField(source="course.id", read_only=True)
    course_title = serializers.CharField(source="course.title", read_only=True)

    course_image = serializers.SerializerMethodField()
    tutor_name = serializers.SerializerMethodField()
    progress = serializers.SerializerMethodField()


    class Meta:
        model = Enrollment
        fields = [
            "id",
            "status",
            "payment_done",
            "student_name",
            "student_email",
            "course_id",
            "course_title",
            "course_image",
            "tutor_name",
            "created_at",
            "sessions",
            "progress",
       
        ]

    def get_student_name(self, obj):
        return (
            f"{obj.student.first_name} {obj.student.last_name}".strip()
            or obj.student.username
        )

    def get_tutor_name(self, obj):
        tutor = getattr(obj.course, "tutor", None)
        if tutor:
            return f"{tutor.first_name} {tutor.last_name}".strip() or tutor.username
        return "N/A"

    def get_course_image(self, obj):
        request = self.context.get("request")
        if obj.course.image and request:
            return request.build_absolute_uri(obj.course.image.url)
        return None
    def get_progress(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
           return 0

        user = request.user
        course = obj.course

        # total sessions
        total_sessions = CourseSession.objects.filter(
            module__course=course
        ).count()

        if total_sessions == 0:
           return 0

        # completed sessions
        completed_sessions = StudentSessionProgress.objects.filter(
            student=user,
            session__module__course=course,
            is_completed=True
        ).count()

        progress = int((completed_sessions / total_sessions) * 100)

        return progress
