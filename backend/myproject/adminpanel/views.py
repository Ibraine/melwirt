# adminpanel/views.py
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers import (
    UserListSerializer, UserDetailSerializer, UserCreateSerializer, UserUpdateSerializer,
    TutorListSerializer, TutorDetailSerializer, TutorCreateSerializer, TutorUpdateSerializer,
    PermissionSerializer
)
from .permissions import IsAdminOrReadOnly
from booking.models import Booking

User = get_user_model()


class StandardPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 100


# ------------------- UserViewSet -------------------
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['role', 'is_active']
    search_fields = ['first_name','last_name','email','username','phone']
    ordering_fields = ['date_joined','first_name','email']

    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        if self.action == 'retrieve':
            return UserDetailSerializer
        if self.action == 'create':
            return UserCreateSerializer
        if self.action in ['update','partial_update']:
            return UserUpdateSerializer
        return UserDetailSerializer

    @action(detail=True, methods=['post'])
    def toggle_status(self, request, pk=None):
        user = self.get_object()
        user.is_active = not user.is_active
        user.save()
        return Response({'id': user.id, 'is_active': user.is_active})

    # ---------- Permissions endpoints ----------
    @action(detail=False, methods=['get'], url_path='permissions')
    def list_permissions(self, request):
        perms = Permission.objects.all().order_by('content_type__app_label','codename')
        serializer = PermissionSerializer(perms, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='permissions')
    def user_permissions(self, request, pk=None):
        user = self.get_object()
        perms = user.user_permissions.all()
        serializer = PermissionSerializer(perms, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'], url_path='permissions')
    def update_user_permissions(self, request, pk=None):
        user = self.get_object()
        perm_ids = request.data.get('permissions', [])
        try:
            perms = Permission.objects.filter(id__in=perm_ids)
            user.user_permissions.set(perms)
            user.save()
            return Response({'status': 'ok', 'permissions_count': perms.count()})
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ------------------- TutorViewSet -------------------
class TutorViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(role='tutor').order_by('-date_joined')
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_active']
    search_fields = ['first_name','last_name','email','username','phone']
    ordering_fields = ['date_joined','first_name','email']

    def get_serializer_class(self):
        if self.action == 'list':
            return TutorListSerializer
        if self.action == 'retrieve':
            return TutorDetailSerializer
        if self.action == 'create':
            return TutorCreateSerializer
        if self.action in ['update','partial_update']:
            return TutorUpdateSerializer
        return TutorDetailSerializer


# ------------------- DashboardStatsView -------------------
class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        total_users = User.objects.count()
        active_users = User.objects.filter(is_active=True).count()
        total_students = User.objects.filter(role__iexact='student').count()
        total_tutors = User.objects.filter(role__iexact='tutor').count()
        total_bookings = Booking.objects.count()
        completed_bookings = Booking.objects.filter(status='completed').count()
        pending_bookings = Booking.objects.filter(status='booked').count()

        return Response({
            'active_users': active_users,
            'total_users': total_users,
            'total_students': total_students,
            'total_tutors': total_tutors,
            'total_bookings': total_bookings,
            'completed_bookings': completed_bookings,
            'pending_bookings': pending_bookings,
        })
