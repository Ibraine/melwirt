# from rest_framework import viewsets, status
# from rest_framework.decorators import action, api_view
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.exceptions import ValidationError

# from django.utils import timezone
# from datetime import date, datetime
# from django.shortcuts import get_object_or_404
# from django.contrib.auth import get_user_model

# from .models import ClassSchedule
# from .serializers import (
#     ClassScheduleSerializer,
#     CreateScheduleSerializer,
#     AdminScheduleSerializer
# )
# from .permission import IsAdminUserOnly, IsOwnerOrAdmin

# User = get_user_model()


# class ScheduleViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]

#     # =====================================================
#     # QUERYSET
#     # =====================================================
#     def get_queryset(self):
#         user = self.request.user

#         qs = ClassSchedule.objects.select_related(
#             "tutor", "student", "course", "module", "session"
#         )

#         if getattr(user, "role", "") == "tutor":
#             qs = qs.filter(tutor=user)

#         if getattr(user, "role", "") == "student":
#             qs = qs.filter(student=user)

#         is_demo = self.request.query_params.get("is_demo")
#         date_str = self.request.query_params.get("date")

#         if is_demo in ["true", "1", "True"]:
#             qs = qs.filter(is_demo=True)

#         if is_demo in ["false", "0", "False"]:
#             qs = qs.filter(is_demo=False)

#         if date_str:
#             try:
#                 qs = qs.filter(date=date.fromisoformat(date_str))
#             except ValueError:
#                 pass

#         return qs.order_by("date", "start_time")

#     # =====================================================
#     # SERIALIZER
#     # =====================================================
#     def get_serializer_class(self):
#         user = self.request.user

#         if self.action == "create":
#             return CreateScheduleSerializer

#         if getattr(user, "role", "") == "admin":
#             return AdminScheduleSerializer

#         return ClassScheduleSerializer

#     # =====================================================
#     # PERMISSIONS
#     # =====================================================
#     def get_permissions(self):
#         if self.action == "create":
#             return [IsAuthenticated(), IsAdminUserOnly()]

#         if self.action in ["update", "partial_update", "destroy"]:
#             return [IsAuthenticated(), IsOwnerOrAdmin()]

#         return [IsAuthenticated()]

#     # =====================================================
#     # CREATE SLOT
#     # =====================================================
#     def perform_create(self, serializer):
#         slot_date = serializer.validated_data["date"]

#         if slot_date < timezone.localdate():
#             raise ValidationError({"date": "Past date not allowed"})

#         serializer.save()

#     # =====================================================
#     # STUDENT JOIN SLOT
#     # =====================================================
#     @action(detail=True, methods=["post"], url_path="assign-student")
#     def assign_student(self, request, pk=None):

#         slot = self.get_object()

#         if getattr(request.user, "role", "") != "student":
#             return Response(
#                 {"detail": "Only students allowed"},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         if slot.student:
#             raise ValidationError("Slot already booked")

#         slot.student = request.user
#         slot.save()

#         return Response(ClassScheduleSerializer(slot).data)

#     # =====================================================
#     # ✅ GET AVAILABLE RESCHEDULE SLOTS
#     # =====================================================
#     @action(detail=True, methods=["get"], url_path="reschedule-slots")
#     def reschedule_slots(self, request, pk=None):

#         current_slot = self.get_object()

#         if current_slot.student != request.user:
#             raise ValidationError("You cannot reschedule this class")

#         today = timezone.localdate()

#         slots = ClassSchedule.objects.filter(
#             tutor=current_slot.tutor,
#             student__isnull=True,
#             date__gte=today
#         ).exclude(
#             id=current_slot.id
#         ).order_by("date", "start_time")

#         serializer = ClassScheduleSerializer(slots, many=True)
#         return Response(serializer.data)

#     # =====================================================
#     # ✅ CONFIRM RESCHEDULE
#     # =====================================================
#     @action(detail=True, methods=["post"], url_path="confirm-reschedule")
#     def confirm_reschedule(self, request, pk=None):

#         old_class = self.get_object()

#         if old_class.student != request.user:
#             raise ValidationError("Not allowed")

#         new_slot_id = request.data.get("new_slot_id")

#         if not new_slot_id:
#             raise ValidationError("New slot required")

#         new_slot = get_object_or_404(
#             ClassSchedule,
#             id=new_slot_id,
#             student__isnull=True
#         )

#         if new_slot.tutor != old_class.tutor:
#             raise ValidationError("Invalid tutor slot")

#         # move student
#         new_slot.student = old_class.student
#         new_slot.save()

#         # free old slot
#         old_class.student = None
#         old_class.save()

#         return Response({
#             "message": "Class rescheduled successfully"
#         })

#     # =====================================================
#     # TUTOR UPCOMING
#     # =====================================================
#     @action(detail=False, methods=["get"], url_path="tutor/upcoming")
#     def tutor_upcoming(self, request):

#         user = request.user
#         now = timezone.localtime()

#         qs = ClassSchedule.objects.filter(tutor=user)

#         upcoming = []
#         for slot in qs:
#             slot_dt = timezone.make_aware(
#                 datetime.combine(slot.date, slot.start_time)
#             )
#             if slot_dt >= now:
#                 upcoming.append(slot)

#         return Response(
#             ClassScheduleSerializer(upcoming, many=True).data
#         )

#     # =====================================================
#     # TUTOR PAST
#     # =====================================================
#     @action(detail=False, methods=["get"], url_path="tutor/past")
#     def tutor_past(self, request):

#         user = request.user
#         now = timezone.localtime()

#         qs = ClassSchedule.objects.filter(tutor=user)

#         past = []
#         for slot in qs:
#             slot_dt = timezone.make_aware(
#                 datetime.combine(slot.date, slot.start_time)
#             )
#             if slot_dt < now:
#                 past.append(slot)

#         return Response(
#             ClassScheduleSerializer(past, many=True).data
#         )

#     # =====================================================
#     # ADMIN UPCOMING
#     # =====================================================
#     @action(detail=False, methods=["get"], url_path="admin/upcoming")
#     def admin_upcoming(self, request):

#         now = timezone.localtime()
#         qs = ClassSchedule.objects.all()

#         upcoming = []
#         for slot in qs:
#             slot_dt = timezone.make_aware(
#                 datetime.combine(slot.date, slot.start_time)
#             )
#             if slot_dt >= now:
#                 upcoming.append(slot)

#         return Response(
#             AdminScheduleSerializer(upcoming, many=True).data
#         )

#     # =====================================================
#     # ADMIN PAST
#     # =====================================================
#     @action(detail=False, methods=["get"], url_path="admin/past")
#     def admin_past(self, request):

#         now = timezone.localtime()
#         qs = ClassSchedule.objects.all()

#         past = []
#         for slot in qs:
#             slot_dt = timezone.make_aware(
#                 datetime.combine(slot.date, slot.start_time)
#             )
#             if slot_dt < now:
#                 past.append(slot)

#         return Response(
#             AdminScheduleSerializer(past, many=True).data
#         )


# # =====================================================
# # STUDENT LIST
# # =====================================================
# @api_view(["GET"])
# def student_list(request):
#     students = User.objects.filter(role="student")
#     data = [
#         {"id": s.id, "name": f"{s.first_name} {s.last_name}"}
#         for s in students
#     ]
#     return Response(data)


# # =====================================================
# # TUTOR LIST
# # =====================================================
# @api_view(["GET"])
# def tutor_list(request):
#     tutors = User.objects.filter(role="tutor")
#     data = [
#         {"id": t.id, "name": f"{t.first_name} {t.last_name}"}
#         for t in tutors
#     ]
#     return Response(data)




from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from django.utils import timezone
from datetime import date, datetime
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from .models import ClassSchedule
from .serializers import (
    ClassScheduleSerializer,
    CreateScheduleSerializer,
    AdminScheduleSerializer
)
from .permission import IsAdminUserOnly, IsOwnerOrAdmin

User = get_user_model()


class ScheduleViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    # =========================
    # QUERYSET
    # =========================
    def get_queryset(self):
        user = self.request.user

        qs = ClassSchedule.objects.select_related(
            "tutor", "student", "course", "module", "session"
        )

        if getattr(user, "role", "") == "tutor":
            qs = qs.filter(tutor=user)

        if getattr(user, "role", "") == "student":
            qs = qs.filter(student=user)

        is_demo = self.request.query_params.get("is_demo")
        date_str = self.request.query_params.get("date")

        if is_demo in ["true", "1", "True"]:
            qs = qs.filter(is_demo=True)

        if is_demo in ["false", "0", "False"]:
            qs = qs.filter(is_demo=False)

        if date_str:
            try:
                qs = qs.filter(date=date.fromisoformat(date_str))
            except ValueError:
                pass

        return qs.order_by("date", "start_time")

    # =========================
    # SERIALIZER
    # =========================
    def get_serializer_class(self):
        user = self.request.user

        if self.action == "create":
            return CreateScheduleSerializer

        if getattr(user, "role", "") == "admin":
            return AdminScheduleSerializer

        return ClassScheduleSerializer

    # =========================
    # PERMISSIONS
    # =========================
    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated(), IsAdminUserOnly()]

        if self.action in ["update", "partial_update", "destroy"]:
            return [IsAuthenticated(), IsOwnerOrAdmin()]

        return [IsAuthenticated()]

    # =========================
    # LIST (IMPORTANT FIX)
    # =========================
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = ClassScheduleSerializer(
            queryset,
            many=True,
            context={"request": request}
        )
        return Response(serializer.data)

    # =========================
    # CREATE SLOT
    # =========================
    def perform_create(self, serializer):
        slot_date = serializer.validated_data["date"]

        if slot_date < timezone.localdate():
            raise ValidationError({"date": "Past date not allowed"})

        serializer.save()

    # =========================
    # STUDENT JOIN SLOT
    # =========================
    @action(detail=True, methods=["post"], url_path="assign-student")
    def assign_student(self, request, pk=None):
        slot = self.get_object()

        if getattr(request.user, "role", "") != "student":
            return Response(
                {"detail": "Only students allowed"},
                status=status.HTTP_403_FORBIDDEN
            )

        if slot.student:
            raise ValidationError("Slot already booked")

        slot.student = request.user
        slot.save()

        return Response(
            ClassScheduleSerializer(
                slot,
                context={"request": request}
            ).data
        )

    # =========================
    # RESCHEDULE SLOTS
    # =========================
    @action(detail=True, methods=["get"], url_path="reschedule-slots")
    def reschedule_slots(self, request, pk=None):

        current_slot = self.get_object()

        if current_slot.student != request.user:
            raise ValidationError("You cannot reschedule this class")

        today = timezone.localdate()

        slots = ClassSchedule.objects.filter(
            tutor=current_slot.tutor,
            student__isnull=True,
            date__gte=today
        ).exclude(id=current_slot.id).order_by("date", "start_time")

        serializer = ClassScheduleSerializer(
            slots,
            many=True,
            context={"request": request}
        )
        return Response(serializer.data)

    # =========================
    # CONFIRM RESCHEDULE
    # =========================
    @action(detail=True, methods=["post"], url_path="confirm-reschedule")
    def confirm_reschedule(self, request, pk=None):

        old_class = self.get_object()

        if old_class.student != request.user:
            raise ValidationError("Not allowed")

        new_slot_id = request.data.get("new_slot_id")

        if not new_slot_id:
            raise ValidationError("New slot required")

        new_slot = get_object_or_404(
            ClassSchedule,
            id=new_slot_id,
            student__isnull=True
        )

        if new_slot.tutor != old_class.tutor:
            raise ValidationError("Invalid tutor slot")

        new_slot.student = old_class.student
        new_slot.save()

        old_class.student = None
        old_class.save()

        return Response({
            "message": "Class rescheduled successfully"
        })

    # =========================
    # TUTOR UPCOMING
    # =========================
    @action(detail=False, methods=["get"], url_path="tutor/upcoming")
    def tutor_upcoming(self, request):

        user = request.user
        now = timezone.localtime()

        qs = ClassSchedule.objects.filter(tutor=user)

        upcoming = []
        for slot in qs:
            slot_dt = timezone.make_aware(
                datetime.combine(slot.date, slot.start_time)
            )
            if slot_dt >= now:
                upcoming.append(slot)

        return Response(
            ClassScheduleSerializer(
                upcoming,
                many=True,
                context={"request": request}
            ).data
        )

    # =========================
    # TUTOR PAST
    # =========================
    @action(detail=False, methods=["get"], url_path="tutor/past")
    def tutor_past(self, request):

        user = request.user
        now = timezone.localtime()

        qs = ClassSchedule.objects.filter(tutor=user)

        past = []
        for slot in qs:
            slot_dt = timezone.make_aware(
                datetime.combine(slot.date, slot.start_time)
            )
            if slot_dt < now:
                past.append(slot)

        return Response(
            ClassScheduleSerializer(
                past,
                many=True,
                context={"request": request}
            ).data
        )

    # =========================
    # ADMIN UPCOMING
    # =========================
    @action(detail=False, methods=["get"], url_path="admin/upcoming")
    def admin_upcoming(self, request):

        now = timezone.localtime()
        qs = ClassSchedule.objects.all()

        upcoming = []
        for slot in qs:
            slot_dt = timezone.make_aware(
                datetime.combine(slot.date, slot.start_time)
            )
            if slot_dt >= now:
                upcoming.append(slot)

        return Response(
            AdminScheduleSerializer(upcoming, many=True).data
        )

    # =========================
    # ADMIN PAST
    # =========================
    @action(detail=False, methods=["get"], url_path="admin/past")
    def admin_past(self, request):

        now = timezone.localtime()
        qs = ClassSchedule.objects.all()

        past = []
        for slot in qs:
            slot_dt = timezone.make_aware(
                datetime.combine(slot.date, slot.start_time)
            )
            if slot_dt < now:
                past.append(slot)

        return Response(
            AdminScheduleSerializer(past, many=True).data
        )


# =========================
# STUDENT LIST
# =========================
@api_view(["GET"])
def student_list(request):
    students = User.objects.filter(role="student")
    data = [
        {"id": s.id, "name": f"{s.first_name} {s.last_name}"}
        for s in students
    ]
    return Response(data)


# =========================
# TUTOR LIST
# =========================
@api_view(["GET"])
def tutor_list(request):
    tutors = User.objects.filter(role="tutor")
    data = [
        {"id": t.id, "name": f"{t.first_name} {t.last_name}"}
        for t in tutors
    ]
    return Response(data)