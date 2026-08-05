# profile/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer
from django.conf import settings
import os

class ProfileViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['put', 'patch'])
    def update_me(self, request):
        profile = request.user.profile
        # Accept multipart/form-data (file uploads handled by DRF automatically)
        serializer = ProfileSerializer(profile, data=request.data, partial=True, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            "message": "Profile updated successfully!",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='delete_image')
    def delete_image(self, request):
        """
        Deletes profile image file (if exists) and clears profile_image field.
        Use POST so frontend can call easily (no multipart required).
        """
        profile = request.user.profile
        if not profile.profile_image:
            return Response({"message": "No profile image to delete."}, status=status.HTTP_200_OK)

        # Delete the file from storage
        try:
            profile.profile_image.delete(save=False)  # deletes file from storage
        except Exception:
            # ignore delete errors but still clear reference
            pass

        profile.profile_image = None
        profile.save(update_fields=['profile_image'])
        return Response({"message": "Profile image deleted."}, status=status.HTTP_200_OK)
