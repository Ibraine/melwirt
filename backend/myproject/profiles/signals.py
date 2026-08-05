from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Profile

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_or_update_profile(sender, instance, created, **kwargs):
    if created:
        # Full name from first_name + last_name
        full_name = f"{instance.first_name or ''} {instance.last_name or ''}".strip()
        
        Profile.objects.create(
            user=instance,
            full_name=full_name,
            email=instance.email
        )
    else:
        # Update profile when user is updated
        if hasattr(instance, 'profile'):
            instance.profile.save()
