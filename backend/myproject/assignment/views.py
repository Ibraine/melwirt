from django.shortcuts import render, get_object_or_404
from rest_framework import generics, serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils import timezone
from django.http import FileResponse
from rest_framework.exceptions import PermissionDenied

from .models import Assignment, AssignmentSubmission
from .serializers import AssignmentSerializer, AssignmentSubmissionSerializer

# =========================
# TUTOR: CREATE ASSIGNMENT
# =========================
class TutorAssignmentCreateView(generics.CreateAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(tutor=self.request.user)

# =========================
# TUTOR: LIST CREATED ASSIGNMENTS
# =========================
class TutorCreatedAssignmentListView(generics.ListAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Assignment.objects.filter(tutor=self.request.user).order_by("-created_at")

# =========================
# STUDENT: VIEW ASSIGNMENTS
# =========================
# class StudentAssignmentListView(generics.ListAPIView):
#     serializer_class = AssignmentSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         course_id = self.request.query_params.get("course")
#         qs = Assignment.objects.all()
#         if course_id:
#             qs = qs.filter(course_id=course_id)
#         return qs.order_by("-created_at")

class StudentAssignmentListView(generics.ListAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def get_queryset(self):
        course_id = self.request.query_params.get("course")
        qs = Assignment.objects.all()
        if course_id:
            qs = qs.filter(course_id=course_id)
        return qs.order_by("-created_at")



# ==================================================
# STUDENT: SUBMIT / RESUBMIT (FIXED FILE UPLOAD)
# ==================================================
class AssignmentSubmitView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # 🔥 MUST for file uploads

    def post(self, request):
        serializer = AssignmentSubmissionSerializer(
            data=request.data,  # pass data including file
            context={'request': request}
        )
        if serializer.is_valid():
            serializer.save(student=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# =========================
# TUTOR: REVIEW SUBMISSION
# =========================
class TutorReviewSubmissionView(generics.UpdateAPIView):
    queryset = AssignmentSubmission.objects.all()
    serializer_class = AssignmentSubmissionSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        submission = self.get_object()
        submission.status = request.data.get("status")
        submission.tutor_remark = request.data.get("tutor_remark", "")
        submission.reviewed_at = timezone.now()
        submission.save()
        return Response({"message": "Reviewed successfully"})

# =========================
# STUDENT: VIEW OWN SUBMISSIONS
# =========================
class StudentSubmissionListView(generics.ListAPIView):
    serializer_class = AssignmentSubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def get_queryset(self):
        return AssignmentSubmission.objects.filter(student=self.request.user).select_related("assignment").order_by("-submitted_at")

# =========================
# FILE DOWNLOAD (SECURE)
# =========================
class AssignmentSubmissionDownloadView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        submission = get_object_or_404(AssignmentSubmission, pk=pk)
        if submission.student != request.user and submission.assignment.tutor != request.user:
            raise PermissionDenied("Not allowed")
        return FileResponse(
            submission.file.open("rb"),
            as_attachment=True,
            filename=submission.file.name.split("/")[-1]
        )

# =========================
# TUTOR: LIST SUBMISSIONS
# =========================
class TutorSubmissionListView(generics.ListAPIView):
    serializer_class = AssignmentSubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return AssignmentSubmission.objects.filter(
            assignment__tutor=self.request.user
        ).select_related("student", "assignment").order_by("-submitted_at")
