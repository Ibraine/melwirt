from rest_framework import viewsets
from .models import Coupon
from .serializers import CouponSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response

class CouponViewSet(viewsets.ModelViewSet):
    queryset = Coupon.objects.all().order_by('-id')
    serializer_class = CouponSerializer
    permission_classes = [IsAdminUser]  # Only admin can access

    @action(detail=True, methods=['post'])
    def toggle_status(self, request, pk=None):
        coupon = self.get_object()
        coupon.status = not coupon.status
        coupon.save()
        return Response({"status": coupon.status})
