from django.db import models
from django.contrib.auth import get_user_model
from courses.models import Course

User = get_user_model()

class Enrollment(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("active", "Active"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="enrollments",
        limit_choices_to={"role": "student"}
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="enrollments"
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    payment_done = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("student", "course")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.student.email} | {self.course.title} | {self.status}"


class EnrollmentSession(models.Model):
    enrollment = models.ForeignKey(
        Enrollment,
        on_delete=models.CASCADE,
        related_name="sessions"
    )
    session_date = models.DateField()
    attended = models.BooleanField(default=False)
    meet_link = models.URLField(blank=True, null=True)

    class Meta:
        ordering = ["session_date"]

    def __str__(self):
        return f"{self.enrollment.student.email} | {self.enrollment.course.title} | {self.session_date}"
