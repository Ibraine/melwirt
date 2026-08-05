from django.db import models
from django.conf import settings  # IMPORTANT

class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,     # Link to custom user model
        on_delete=models.CASCADE,
        related_name="profile"
    )

    full_name = models.CharField(max_length=150)
    mobile = models.CharField(max_length=20, blank=True)
    email = models.EmailField()
    dob = models.DateField(null=True, blank=True)

    country = models.CharField(max_length=50, blank=True)
    city = models.CharField(max_length=50, blank=True)

    about = models.TextField(blank=True)

    profile_image = models.ImageField(upload_to="profile_images/", null=True, blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name
