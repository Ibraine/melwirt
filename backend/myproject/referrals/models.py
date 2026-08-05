from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Referral(models.Model):
    REWARD_TYPE_CHOICES = [
        ("Enrollment", "Enrollment"),
        ("Onboarding", "Onboarding"),
    ]
    reward_by = models.ForeignKey(User, related_name="referrals_given", on_delete=models.CASCADE)
    refer_to = models.ForeignKey(User, related_name="referrals_received", on_delete=models.CASCADE)
    reward_given = models.BooleanField(default=False)
    reward_type = models.CharField(max_length=20, choices=REWARD_TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.reward_by} -> {self.refer_to}"
