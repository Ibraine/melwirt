from rest_framework import permissions

class IsTutorOrAdmin(permissions.BasePermission):
    """
    Allow access only to tutors (for slot creation) or admins for management.
    """

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        # admins allowed
        if getattr(request.user, "role", "") == "admin" or request.user.is_superuser:
            return True
        # tutor allowed
        if getattr(request.user, "role", "") == "tutor":
            return True
        return False

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Allow object-level editing only to owner (tutor) or admin.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser or getattr(request.user, "role", "") == "admin":
            return True
        return obj.tutor == request.user


class IsAdminUserOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return (
            getattr(request.user, "role", "") == "admin"
            or request.user.is_superuser
        )