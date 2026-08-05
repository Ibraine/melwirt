from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookingViewSet, DemoBookingViewSet, book_demo, TutorViewSet,public_demo_slots

# 🔹 DRF router for authenticated APIs
router = DefaultRouter()
# router.register(r'tutor-slots', TutorSlotViewSet, basename='tutorslot')
router.register(r'bookings', BookingViewSet, basename='booking')
router.register(r'demo-bookings', DemoBookingViewSet, basename='demobooking')  # ✅ Added
router.register(r'tutors', TutorViewSet, basename='tutor')

urlpatterns = [
    # 🌍 Public endpoints
    path('book-demo/', book_demo, name='book-demo'),
    path('public/demo-slots/', public_demo_slots),  # ⭐ Step4 API




    # 🔐 Authenticated routes (admin/tutor)
    path('', include(router.urls)),
]
