from django.db import models
from accounts.models import User  # custom User model import


# =========================
# COURSE MODEL (AS IT IS)
# =========================
class Course(models.Model):
    LEVEL_CHOICES = [
        ("beginner", "Beginner"),
        ("intermediate", "Intermediate"),
        ("advanced", "Advanced"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()

    tutor = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={"role": "tutor"},
        related_name="courses"
    )

    enrolled_students = models.ManyToManyField(
        User,
        blank=True,
        related_name="enrolled_courses",
        limit_choices_to={'role': 'student'}
    )

    duration_weeks = models.PositiveIntegerField(default=4)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default="beginner")
    price_inr = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    price_usd = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    image = models.ImageField(upload_to="courses/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Course"
        verbose_name_plural = "Courses"

    def __str__(self):
        return self.title


# =========================
# STEP 1: COURSE MODULE
# =========================
class CourseModule(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="modules"
    )
    title = models.CharField(max_length=200)
    order = models.PositiveIntegerField(help_text="Module order (1,2,3,4...)")

    class Meta:
        ordering = ["order"]
        unique_together = ("course", "order")

    def __str__(self):
        return f"{self.course.title} - {self.title}"


# =========================
# STEP 2: COURSE SESSION
# =========================
class CourseSession(models.Model):
    module = models.ForeignKey(
        CourseModule,
        on_delete=models.CASCADE,
        related_name="sessions"
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(help_text="Session order inside module")
    duration_minutes = models.PositiveIntegerField(default=30)

    class Meta:
        ordering = ["order"]
        unique_together = ("module", "order")

    def __str__(self):
        return f"{self.module.title} - {self.title}"

    def get_class_number(self):
        course = self.module.course

    # total sessions in course
        total = CourseSession.objects.filter(
            module__course=course
        ).count()

    # sessions before current module
        prev_sessions = CourseSession.objects.filter(
             module__course=course,
             module__order__lt=self.module.order
        ).count()

    # sessions in current module till now
        current_sessions = CourseSession.objects.filter(
                module=self.module,
                order__lte=self.order
        ).count()

        current = prev_sessions + current_sessions

        return f"{current}/{total}"
# =========================
# STEP 3: STUDENT PROGRESS
# =========================
class StudentSessionProgress(models.Model):
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={"role": "student"}
    )
    session = models.ForeignKey(
        CourseSession,
        on_delete=models.CASCADE
    )
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ("student", "session")

    def __str__(self):
        return f"{self.student.email} - {self.session.title}"


# =========================
# STEP 4: SESSION SUMMARY (Tutor Feedback)
# =========================
class SessionSummary(models.Model):
    session = models.OneToOneField(
        CourseSession,
        on_delete=models.CASCADE,
        related_name="summary_obj"
    )

    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={"role": "student"},
        related_name="student_summaries"   # ✅ ADD THIS
    )

    tutor = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={"role": "tutor"},
        related_name="tutor_summaries"     # ✅ ADD THIS
    )

    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Summary - {self.session.title} - {self.student.email}"
    


# =========================
# STEP 5: SESSION CONTENT (Videos)
# =========================
class SessionContent(models.Model):
    session = models.OneToOneField(
        CourseSession,
        on_delete=models.CASCADE,
        related_name="content_obj"
    )

    recording_url = models.URLField(null=True, blank=True)
    project_video_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return f"Content - {self.session.title}"