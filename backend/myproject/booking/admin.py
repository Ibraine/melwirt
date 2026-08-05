from django.contrib import admin
from .models import Tutor, TutorSlot, Booking

@admin.register(Tutor)
class TutorAdmin(admin.ModelAdmin):
    list_display = ('id','user','phone','is_active','created_at')

@admin.register(TutorSlot)
class TutorSlotAdmin(admin.ModelAdmin):
    list_display = ('id','tutor','date','start_time','end_time','is_booked')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id','student','tutor','slot','status','created_at')
    list_filter = ('status','slot__date','tutor')
