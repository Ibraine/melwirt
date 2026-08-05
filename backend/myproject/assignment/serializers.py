from rest_framework import serializers
from .models import Assignment, AssignmentSubmission

# =========================
# ASSIGNMENT SERIALIZER
# =========================
# class AssignmentSerializer(serializers.ModelSerializer):
#     tutor_name = serializers.SerializerMethodField()
#     course_title = serializers.CharField(source="course.title", read_only=True)

#     class Meta:
#         model = Assignment
#         fields = [
#             "id",
#             "tutor",
#             "tutor_name",
#             "course",
#             "course_title",
#             "title",
#             "description",
#             "due_date",
#             "created_at",
#         ]
#         read_only_fields = ["tutor", "created_at"]

#     def get_tutor_name(self, obj):
#         user = obj.tutor
#         if user.first_name or user.last_name:
#             return f"{user.first_name} {user.last_name}".strip()
#         return user.email.split("@")[0]

# =========================
# ASSIGNMENT SERIALIZER (UPDATED)
# =========================
class AssignmentSerializer(serializers.ModelSerializer):
    tutor_name = serializers.SerializerMethodField()
    course_title = serializers.CharField(source="course.title", read_only=True)

    # 🔥 NEW FIELDS FOR UI
    status = serializers.SerializerMethodField()
    feedback = serializers.SerializerMethodField()
    action = serializers.SerializerMethodField()

    class Meta:
        model = Assignment
        fields = [
            "id",
            "tutor",
            "tutor_name",
            "course",
            "course_title",
            "title",
            "description",
            "due_date",
            "created_at",

            # 🔥 added
            "status",
            "feedback",
            "action",
        ]
        read_only_fields = ["tutor", "created_at"]

    def get_tutor_name(self, obj):
        user = obj.tutor
        return f"{user.first_name} {user.last_name}".strip() or user.email.split("@")[0]

    # =========================
    # 🔥 SUBMISSION LOOKUP
    # =========================
    def _get_submission(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return None

        return AssignmentSubmission.objects.filter(
            assignment=obj,
            student=request.user
        ).order_by("-submitted_at").first()

    def get_status(self, obj):
        submission = self._get_submission(obj)
        if not submission:
            return None
        return submission.status

    def get_feedback(self, obj):
        submission = self._get_submission(obj)
        return submission.tutor_remark if submission else ""

    def get_action(self, obj):
        submission = self._get_submission(obj)

        if not submission:
            return "SUBMIT"

        if submission.status == "REJECTED":
            return "RESUBMIT"

        if submission.status == "SUCCESS":
            return "VIEW"

        return "SUBMITTED"


# =========================
# ASSIGNMENT SUBMISSION SERIALIZER
# =========================
class AssignmentSubmissionSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    assignment_title = serializers.CharField(source="assignment.title", read_only=True)
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = AssignmentSubmission
        fields = [
            "id",
            "assignment",         # 🔥 frontend must send 'assignment' key
            "assignment_title",
            "student",            # read-only, auto set from request.user
            "student_name",
            "file",
            "file_url",
            "tutor_remark",
            "status",
            "resubmitted",
            "submitted_at",
            "reviewed_at",
        ]
        read_only_fields = [
            "student",
            "status",
            "resubmitted",
            "submitted_at",
            "reviewed_at",
        ]

    def validate_file(self, value):
        if not value:
            raise serializers.ValidationError("Assignment file is required")
        return value

    def get_student_name(self, obj):
        user = obj.student
        return f"{user.first_name} {user.last_name}".strip() or user.email.split("@")[0]

    def get_file_url(self, obj):
        request = self.context.get("request")
        if obj.file and request:
            return request.build_absolute_uri(obj.file.url)
        return None
