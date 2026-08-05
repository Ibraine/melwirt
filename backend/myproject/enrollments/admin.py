from django.contrib import admin
from .models import Enrollment, EnrollmentSession

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ("student", "course", "status", "payment_done", "created_at")
    list_filter = ("status", "payment_done")
    search_fields = ("student__email", "course__title")

@admin.register(EnrollmentSession)
class EnrollmentSessionAdmin(admin.ModelAdmin):
    list_display = ("enrollment", "session_date", "attended")
    list_filter = ("attended",)
