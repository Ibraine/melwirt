from django.contrib import admin
from .models import Coupon

@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ["code", "discount_type", "discount_value", "first_time_user", "min_cart_value", "usage_limit", "usage_count", "status", "valid_from", "valid_to"]
    list_editable = ["status"]
    search_fields = ["code"]
