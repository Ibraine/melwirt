from django.db import models
from django.conf import settings
from schedules.models import ClassSchedule


User = settings.AUTH_USER_MODEL


class Tutor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="tutor_profile")
    bio = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        first = self.user.first_name or ""
        last = self.user.last_name or ""
        full_name = f"{first} {last}".strip()

        return full_name if full_name else (self.user.username or "Tutor")


class TutorSlot(models.Model):
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE, related_name='slots')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_booked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('tutor', 'date', 'start_time')
        ordering = ['date', 'start_time']

    def __str__(self):
        return f"{self.tutor} | {self.date} {self.start_time}-{self.end_time}"


class Booking(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    mobile = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    course = models.CharField(max_length=100, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)

    student_time = models.CharField(max_length=50, blank=True, null=True)         # "7:00 PM"
    student_timezone = models.CharField(max_length=64, blank=True, null=True)     # "Asia/Dubai"
    student_country = models.CharField(max_length=8, blank=True, null=True)       # "IN"
    country = models.CharField(max_length=5, blank=True, null=True)

    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings', blank=True, null=True)
    tutor = models.ForeignKey(Tutor, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    # slot = models.ForeignKey(TutorSlot, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    slot = models.ForeignKey(ClassSchedule,on_delete=models.SET_NULL,null=True,blank=True,related_name='bookings')

    STATUS_BOOKED = 'booked'
    STATUS_COMPLETED = 'completed'
    STATUS_CANCELLED_BY_TUTOR = 'cancelled_by_tutor'
    STATUS_CANCELLED_BY_ADMIN = 'cancelled_by_admin'
    STATUS_REASSIGNED = 'reassigned'

    STATUS_CHOICES = (
        (STATUS_BOOKED, 'Booked'),
        (STATUS_COMPLETED, 'Completed'),
        (STATUS_CANCELLED_BY_TUTOR, 'Cancelled by Tutor'),
        (STATUS_CANCELLED_BY_ADMIN, 'Cancelled by Admin'),
        (STATUS_REASSIGNED, 'Reassigned'),
    )

    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default=STATUS_BOOKED)
    meeting_link = models.URLField(blank=True, null=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def cancel_by_tutor(self, reason=None):
        self.status = self.STATUS_CANCELLED_BY_TUTOR
        # if self.slot:
        #     self.slot.is_booked = False
        #     self.slot.save()
        if self.slot:
           self.slot.student = None
           self.slot.save(update_fields=["student"])
        
        if reason:
            self.notes = (self.notes or '') + f"\nCancelled by tutor: {reason}"
        self.save()

    def reassign_to_slot(self, new_slot):
        # if not new_slot or new_slot.is_booked:
        #     raise ValueError("Slot invalid or already booked")
        # if self.slot:
        #     self.slot.is_booked = False
        #     self.slot.save()

        # self.slot = new_slot
        # self.tutor = new_slot.tutor
        # new_slot.is_booked = True
        # new_slot.save()
        # self.status = self.STATUS_REASSIGNED
        # self.save()
         if not new_slot or new_slot.student:
              raise ValueError("Slot invalid or already booked")

         if self.slot:
             self.slot.student = None
             self.slot.save(update_fields=["student"])

         self.slot = new_slot
         self.tutor = new_slot.tutor

         new_slot.student = self.student
         new_slot.save(update_fields=["student"])

         self.status = self.STATUS_REASSIGNED
         self.save()
    def __str__(self):
        # Student name logic
        if self.student:
            first = self.student.first_name or ""
            last = self.student.last_name or ""
            student_name = f"{first} {last}".strip() or self.student.username
        else:
            student_name = self.name or "Unnamed"

        tutor_name = str(self.tutor) if self.tutor else "TBD"
        slot_info = str(self.slot) if self.slot else f"{self.date or 'No Date'} {self.time or ''}"

        return f"{student_name} -> {tutor_name} on {slot_info}"
