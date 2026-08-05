from django.contrib import admin
from .models import ClassSchedule


@admin.register(ClassSchedule)
class ClassScheduleAdmin(admin.ModelAdmin):
    list_display = (
        "tutor",
        "student",
        "course",
        "date",
        "start_time",
        "end_time",
        "is_demo",
    )

    list_filter = (
        "date",
        "is_demo",
        "tutor",
    )

    search_fields = (
        "tutor__email",
        "student__email",
        "course__title",
    )
