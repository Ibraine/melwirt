from rest_framework import permissions

class IsParticipantOrAdmin(permissions.BasePermission):
    """
    Allow access if user is admin OR the user is either the student or teacher of the session.
    For message-level checks, message.sender must be user or admin.
    """
    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        if user.is_staff:  # admin can do anything
            return True

        # ChatSession object
        if hasattr(obj, 'student') and hasattr(obj, 'teacher'):
            return obj.student == user or obj.teacher == user

        # Message object: allow if user is sender OR participant of session
        if hasattr(obj, 'session'):
            if obj.sender == user:
                return True
            return obj.session.student == user or obj.session.teacher == user

        return False
