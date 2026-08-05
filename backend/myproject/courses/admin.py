# from django.contrib import admin
# from .models import Course

# @admin.register(Course)
# class CourseAdmin(admin.ModelAdmin):
#     list_display = ("title", "get_tutor_name", "level", "price_inr", "is_active")
#     list_filter = ("level", "is_active")
#     search_fields = ("title", "tutor__name")

#     def get_tutor_name(self, obj):
#         return obj.tutor.name if obj.tutor else "-"
#     get_tutor_name.short_description = "Tutor"


from django.contrib import admin
from .models import (
    Course,
    CourseModule,
    CourseSession,
    StudentSessionProgress,
)


# =========================
# COURSE ADMIN
# =========================
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "get_tutor_name", "level", "price_inr", "is_active")
    list_filter = ("level", "is_active")
    search_fields = (
        "title",
        "tutor__username",
        "tutor__first_name",
        "tutor__last_name",
    )

    def get_tutor_name(self, obj):
        if obj.tutor:
            full_name = f"{obj.tutor.first_name} {obj.tutor.last_name}".strip()
            return full_name if full_name else obj.tutor.username
        return "-"

    get_tutor_name.short_description = "Tutor"


# =========================
# COURSE MODULE ADMIN
# =========================
@admin.register(CourseModule)
class CourseModuleAdmin(admin.ModelAdmin):
    list_display = ("title", "course", "order")
    list_filter = ("course",)
    ordering = ("course", "order")
    search_fields = ("title", "course__title")


# =========================
# COURSE SESSION ADMIN
# =========================
@admin.register(CourseSession)
class CourseSessionAdmin(admin.ModelAdmin):
    list_display = ("title", "module", "order", "duration_minutes")
    list_filter = ("module",)
    ordering = ("module", "order")
    search_fields = ("title", "module__title")


# =========================
# STUDENT SESSION PROGRESS
# =========================
@admin.register(StudentSessionProgress)
class StudentSessionProgressAdmin(admin.ModelAdmin):
    list_display = ("student", "session", "is_completed")
    list_filter = ("is_completed", "student")
    search_fields = ("student__username", "session__title")
