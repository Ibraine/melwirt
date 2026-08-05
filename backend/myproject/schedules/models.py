from django.db import models
from django.contrib.auth import get_user_model
from courses.models import Course, CourseModule, CourseSession

User = get_user_model()


class ClassSchedule(models.Model):
    # =========================
    # TUTOR (REQUIRED)
    # =========================
    tutor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="tutor_classes",
        limit_choices_to={"role": "tutor"}
    )

    # =========================
    # STUDENT (ONE-TO-ONE)
    # =========================
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="student_classes",
        limit_choices_to={"role": "student"},
        null=True,
        blank=True
    )

    # =========================
    # COURSE STRUCTURE
    # =========================
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="class_schedules"
    )

    module = models.ForeignKey(
        CourseModule,
        on_delete=models.SET_NULL,
        related_name="class_schedules",
        null=True,
        blank=True
    )

    session = models.ForeignKey(
        CourseSession,
        on_delete=models.SET_NULL,
        related_name="class_schedules",
        null=True,
        blank=True
    )

    # =========================
    # CLASS TIMING
    # =========================
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    # =========================
    # CLASS TYPE
    # =========================
    is_demo = models.BooleanField(default=False)

    meet_link = models.URLField(
        blank=True,
        null=True,
        help_text="Google Meet / Zoom link"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date", "-start_time"]
        unique_together = (
            "tutor",
            "date",
            "start_time",
            "end_time"
        )

    def __str__(self):
        student_name = self.student.email if self.student else "Demo Slot"
        return f"{self.course.title} | {student_name} | {self.date} {self.start_time}"
