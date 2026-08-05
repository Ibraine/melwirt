from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Referral
from .serializers import ReferralSerializer


class ReferralViewSet(viewsets.ModelViewSet):
    serializer_class = ReferralSerializer

    # =============================
    # PERMISSIONS
    # =============================
    def get_permissions(self):
        user = self.request.user

        # ADMIN → FULL ACCESS
        if user.role == "admin":
            return [permissions.IsAuthenticated()]

        # TUTOR → READ ONLY (LIST / RETRIEVE)
        if user.role == "tutor":
            if self.action in ["list", "retrieve"]:
                return [permissions.IsAuthenticated()]
            return [permissions.IsAdminUser()]  # block create/update/delete

        # STUDENT → ONLY SUMMARY
        if user.role == "student":
            if self.action == "student_summary":
                return [permissions.IsAuthenticated()]

        return [permissions.IsAdminUser()]

    # =============================
    # QUERYSET
    # =============================
    def get_queryset(self):
        user = self.request.user

        # ADMIN → ALL
        if user.role == "admin":
            return Referral.objects.all().order_by("-created_at")

        # TUTOR → ONLY HIS REFERRALS
        if user.role == "tutor":
            return Referral.objects.filter(
                reward_by=user
            ).order_by("-created_at")

        return Referral.objects.none()

    # =============================
    # STUDENT REFERRAL SUMMARY
    # =============================
    @action(
        detail=False,
        methods=["get"],
        permission_classes=[permissions.IsAuthenticated],
        url_path="student-summary"
    )
    def student_summary(self, request):
        user = request.user

        if user.role != "student":
            return Response({"detail": "Not allowed"}, status=403)

        referrals = Referral.objects.filter(reward_by=user)

        return Response({
            "referral_code": f"STU{user.id}",
            "total_referrals": referrals.count(),
            "reward_earned": referrals.filter(reward_given=True).count() * 500
        })
