from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from rest_framework.exceptions import PermissionDenied

from .models import ChatSession, Message
from .serializers import ChatSessionSerializer, MessageSerializer, SimpleUserSerializer
from .permissions import IsParticipantOrAdmin
from enrollments.models import Enrollment


# ================= CHAT SESSIONS =================
class ChatSessionViewSet(viewsets.ModelViewSet):
    """
    Admin: sees all sessions
    Student/Teacher: sees only their sessions
    Also:
    - Prevent duplicate chats
    - Allow chat only if enrollment is ACTIVE
    - Provide available users for + button
    """

    queryset = ChatSession.objects.all().order_by('-created_at')
    serializer_class = ChatSessionSerializer
    permission_classes = [IsAuthenticated, IsParticipantOrAdmin]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]
    filterset_fields = ['student', 'teacher']
    search_fields = ['title', 'student__username', 'teacher__username']
    ordering_fields = ['created_at']

    # ---------------- LIST FILTER ----------------
    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return self.queryset

        return ChatSession.objects.filter(
            Q(student=user) | Q(teacher=user)
        ).order_by('-created_at')

    # ---------------- CREATE CHAT ----------------
    def perform_create(self, serializer):
        student = serializer.validated_data.get("student")
        teacher = serializer.validated_data.get("teacher")

        if not student or not teacher:
            raise PermissionDenied("Student and Teacher required")

        # ✅ Enrollment must be ACTIVE
        if not Enrollment.objects.filter(
            student=student,
            course__tutor=teacher,
            status="active"
        ).exists():
            raise PermissionDenied("Student not enrolled in tutor course")

        # ✅ Prevent duplicate chat
        if ChatSession.objects.filter(
            student=student,
            teacher=teacher
        ).exists():
            raise PermissionDenied("Chat already exists")

        serializer.save()
    

    def list(self, request, *args, **kwargs):
        """
        Override list to pass request context to serializer
        for student/teacher profile_image
        """
        queryset = self.filter_queryset(self.get_queryset())
        serializer = ChatSessionSerializer(
            queryset,
            many=True,
            context={"request": request}  # 🔥 Mandatory
        )
        return Response(serializer.data)
    
    # ---------------- + BUTTON USERS ----------------
    @action(detail=False, methods=['get'])
    def available_users(self, request):
        user = request.user

        # ===== STUDENT SIDE =====
        if user.role == "student":
            enrollments = Enrollment.objects.filter(
                student=user,
                status="active"
            ).select_related("course__tutor")

            tutors = []

            for e in enrollments:
                tutor = e.course.tutor
                if tutor:
                    exists = ChatSession.objects.filter(
                        student=user,
                        teacher=tutor
                    ).exists()

                    if not exists:
                        tutors.append(tutor)

            data = SimpleUserSerializer(
                list(set(tutors)),
                many=True,
                context={"request": request}
            ).data

            return Response(data)

        # ===== TUTOR SIDE =====
        elif user.role == "tutor":
            enrollments = Enrollment.objects.filter(
                course__tutor=user,
                status="active"
            ).select_related("student")

            students = []

            for e in enrollments:
                student = e.student

                exists = ChatSession.objects.filter(
                    student=student,
                    teacher=user
                ).exists()

                if not exists:
                    students.append(student)

            data = SimpleUserSerializer(
                list(set(students)),
                many=True,
                context={"request": request}
            ).data

            return Response(data)

        return Response([])


# ================= MESSAGES =================
class MessageViewSet(viewsets.ModelViewSet):
    """
    Messages:
    - Only participants or admin can read/write
    - Auto mark as read on fetch
    - Admin can send system / teacher / student messages
    """

    queryset = Message.objects.select_related(
        'sender', 'session'
    ).all().order_by('timestamp')

    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated, IsParticipantOrAdmin]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['session']

    def get_queryset(self):
        user = self.request.user
        qs = self.queryset

        if not user.is_staff:
            qs = qs.filter(
                Q(session__student=user) |
                Q(session__teacher=user)
            )

        # ✅ Auto mark as read
        session_id = self.request.query_params.get('session')
        if session_id:
            qs.filter(
                session_id=session_id
            ).exclude(sender=user).update(read=True)

        return qs
    

    def list(self, request, *args, **kwargs):  # add after line ~174
        """
        Override list to pass request context to serializer
        for sender profile_image
        """
        queryset = self.filter_queryset(self.get_queryset())
        serializer = MessageSerializer(
            queryset,
            many=True,
            context={"request": request}  # 🔥 MANDATORY
        )
        return Response(serializer.data)
    def perform_create(self, serializer):
        user = self.request.user
        session = serializer.validated_data.get('session')

        if session is None:
            raise PermissionDenied("Session is required")

        if not (user.is_staff or session.student == user or session.teacher == user):
            raise PermissionDenied("Not allowed")

        if user.is_staff:
            requested_type = serializer.validated_data.get('sender_type')
            sender_type = (
                requested_type
                if requested_type in ['system', 'teacher', 'student']
                else 'system'
            )
        else:
            sender_type = 'teacher' if session.teacher == user else 'student'

        serializer.save(sender=user, sender_type=sender_type)