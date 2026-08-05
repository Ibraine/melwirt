from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .models import Enrollment
from .serializers import EnrollmentSerializer

# ===========================
# Admin: Full CRUD for Enrollments
# ===========================
class EnrollmentListCreateAdminAPIView(generics.ListCreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAdminUser]

class EnrollmentRetrieveUpdateDestroyAdminAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAdminUser]

# ===========================
# Student: Own Enrollments
# ===========================
class StudentEnrollmentListAPIView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Enrollment.objects.filter(student=user)


class StudentMyCoursesAPIView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role != "student":
            return Enrollment.objects.none()

        return Enrollment.objects.filter(
            student=user,
            status__in=["active", "pending"]
        ).select_related("course", "course__tutor")

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request   # ✅ VERY IMPORTANT
        return context
