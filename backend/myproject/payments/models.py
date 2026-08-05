

# Create your models here.
from django.db import models
from django.conf import settings
from courses.models import Course


User = settings.AUTH_USER_MODEL


class Payment(models.Model):

    STATUS_CHOICES = (
        ("created", "Created"),
        ("paid", "Paid"),
        ("failed", "Failed"),
    )

    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="payments"
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="payments"
    )

    amount = models.PositiveIntegerField()

    razorpay_order_id = models.CharField(
        max_length=255,
        unique=True
    )

    razorpay_payment_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    razorpay_signature = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="created"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student} - {self.course} - {self.status}"
