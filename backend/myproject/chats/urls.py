from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatSessionViewSet, MessageViewSet

router = DefaultRouter()
router.register(r'chat-sessions', ChatSessionViewSet, basename='chat-session')
router.register(r'messages', MessageViewSet, basename='message')

urlpatterns = [
    path('', include(router.urls)),
]
