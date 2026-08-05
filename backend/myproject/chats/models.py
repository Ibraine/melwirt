from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatSession(models.Model):
    """
    Represents a session (one row in your session table: Session 1, Student, Teacher).
    """
    title = models.CharField(max_length=150)   # e.g. "Session 1"
    student = models.ForeignKey(User, related_name='chat_sessions_as_student', on_delete=models.CASCADE)
    teacher = models.ForeignKey(User, related_name='chat_sessions_as_teacher', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} — {self.student} -> {self.teacher}"


# class Message(models.Model):
#     """
#     Chat messages belonging to a session.
#     sender_type can be 'student' or 'teacher' (keeps it simple).
#     """
#     SENDER_CHOICES = (
#         ('student', 'Student'),
#         ('teacher', 'Teacher'),
#         ('system', 'System'),
#     )
#     session = models.ForeignKey(ChatSession, related_name='messages', on_delete=models.CASCADE)
#     sender = models.ForeignKey(User, related_name='messages_sent', on_delete=models.CASCADE)
#     sender_type = models.CharField(max_length=20, choices=SENDER_CHOICES)
#     text = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)
#     read = models.BooleanField(default=False)

#     class Meta:
#         ordering = ['timestamp']

#     def __str__(self):
#         return f"[{self.timestamp}] {self.sender}: {self.text[:40]}"


class Message(models.Model):
    SENDER_CHOICES = (
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('system', 'System'),
    )

    session = models.ForeignKey(
        ChatSession, related_name='messages',
        on_delete=models.CASCADE
    )
    sender = models.ForeignKey(
        User, related_name='messages_sent',
        on_delete=models.CASCADE
    )
    sender_type = models.CharField(max_length=20, choices=SENDER_CHOICES)

    # ✅ TEXT + EMOJI
    text = models.TextField(blank=True)

    # ✅ IMAGE SUPPORT
    image = models.ImageField(
        upload_to='chat_images/',
        null=True, blank=True
    )

    timestamp = models.DateTimeField(auto_now_add=True)

    # ✅ READ / UNREAD
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.sender} - {self.timestamp}"