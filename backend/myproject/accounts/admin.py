# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ("id","email","role","is_staff","is_active")
    list_filter = ("role","is_staff","is_active")
    search_fields = ("email",)
    ordering = ("id",)
    fieldsets = (
        (None, {"fields": ("email","password","role")}),
        ("Permissions", {"fields": ("is_active","is_staff","is_superuser","groups","user_permissions")}),
    )
    add_fieldsets = (
        (None, {"fields": ("email","password1","password2","role","is_active","is_staff")}),
    )
