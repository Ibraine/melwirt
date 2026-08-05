
from schedules.models import ClassSchedule
from rest_framework import serializers
from django.db import transaction
from django.db.models import Q
from .models import Tutor,  Booking
from django.contrib.auth import get_user_model
from django.utils import timezone


User = get_user_model()


# ---------------- Tutor Serializer ----------------
# class TutorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Tutor
#         fields = ['id', 'user', 'bio', 'phone', 'is_active', 'created_at']
#         read_only_fields = ['id', 'created_at']

class TutorSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Tutor
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "bio",
            "phone",
            "is_active",
            "created_at",
        ]

# ---------------- TutorSlot Serializer ----------------
# class TutorSlotSerializer(serializers.ModelSerializer):
#     tutor_info = TutorSerializer(source='tutor', read_only=True)

#     class Meta:
#         model = TutorSlot
#         fields = [
#             'id', 'tutor', 'tutor_info', 'date',
#             'start_time', 'end_time', 'is_booked', 'created_at'
#         ]
#         read_only_fields = ['id', 'is_booked', 'created_at']


# ---------------- Booking Serializer ----------------
class BookingSerializer(serializers.ModelSerializer):
    course = serializers.SerializerMethodField()
    # Read-only fields for nested info
    student_info = serializers.SerializerMethodField(read_only=True)
    tutor_info = TutorSerializer(source='tutor', read_only=True)
    # slot_info = TutorSlotSerializer(source='slot', read_only=True)
    slot_info = serializers.SerializerMethodField(read_only=True)


    # Input helpers
    tutor_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    email = serializers.EmailField(required=True)
    mobile = serializers.CharField(max_length=15, required=True)
    # Student-facing fields
    student_time = serializers.CharField(required=False, allow_blank=True)
    student_timezone = serializers.CharField(required=False, allow_blank=True)
    student_country = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'student', 'student_info',
            'tutor', 'tutor_info',
            'slot', 'slot_info',
            'status', 'meeting_link', 'notes',
            'created_at', 'course', 'date', 'time', 'email', 'name', 'mobile',
            'tutor_name',
            'student_time', 'student_timezone', 'student_country',
        ]
        read_only_fields = ['id', 'status', 'created_at', 'tutor_info', 'slot_info', 'tutor']

    # ---------------- Student Info ----------------
    def get_student_info(self, obj):
        user = obj.student
        if not user:
            return None
        return {
            'id': getattr(user, 'id', None),
            'username': getattr(user, 'username', ''),
            'email': getattr(user, 'email', ''),
        }

    def get_course(self, obj):
        # Agar booking kisi slot se bani hai
        if obj.slot and hasattr(obj.slot, "course") and obj.slot.course:
            return obj.slot.course.title

        # Fallback
        return obj.course  
    
    def get_slot_info(self, obj):
        slot = obj.slot
        if not slot:
            return None

        return {
            "id": slot.id,
            "date": slot.date,
            "start_time": slot.start_time,
            "end_time": slot.end_time,
            "tutor": slot.tutor.id if slot.tutor else None
        }

    
    # ---------------- Validation ----------------
    # def validate(self, attrs):
    #     slot = attrs.get('slot', None)
    #     date = attrs.get('date', None)

    #     if slot and date:
    #         if slot.date and slot.date != date:
    #             raise serializers.ValidationError("Selected slot does not match provided date.")
    #     return attrs

    def validate(self, attrs):
        slot = attrs.get('slot', None)
        date = attrs.get('date', None)

    # Prevent past booking
        if date and date < timezone.now().date():
           raise serializers.ValidationError("Cannot book past dates.")

        if slot and date:
           if slot.date and slot.date != date:
               raise serializers.ValidationError("Selected slot does not match provided date.")

        return attrs


    # ---------------- Create ----------------
    def create(self, validated_data):
        tutor_name = validated_data.pop('tutor_name', None)
        student = validated_data.get('student', None)
        email = validated_data.get('email', None)
        name = validated_data.get('name') or (email.split('@')[0] if email else "Student")
        mobile = validated_data.get('mobile', None)
        course = validated_data.get('course', '')
        date = validated_data.get('date', None)
        time_val = validated_data.get('time', None)
        notes = validated_data.get('notes', '')

        # Student-facing
        student_time_str = validated_data.get('student_time', None)
        student_timezone = validated_data.get('student_timezone', None)
        student_country = validated_data.get('student_country', None)

         # Try to resolve tutor by name if given (same as your old code)
        tutor_obj = None
        if tutor_name:
            tutor_obj = Tutor.objects.filter(user__first_name__icontains=tutor_name).first() \
                        or Tutor.objects.filter(user__username__icontains=tutor_name).first()

        chosen_slot = validated_data.get('slot', None)

       
        # # ---------- CASE A: chosen slot ----------
        # if chosen_slot:
        #     with transaction.atomic():
        #         slot_for_update = TutorSlot.objects.select_for_update().get(pk=chosen_slot.pk)
        #         if slot_for_update.is_booked:
        #             raise serializers.ValidationError("Selected slot is already booked. Please choose another slot.")

        #         slot_for_update.is_booked = True
        #         slot_for_update.save(update_fields=['is_booked'])

        #         booking = Booking.objects.create(
        #             student=student,
        #             slot=slot_for_update,
        #             tutor=slot_for_update.tutor,
        #             notes=notes,
        #             course=course,
        #             date=date or slot_for_update.date,
        #             time=time_val or slot_for_update.start_time,
        #             email=email,
        #             name=name,
        #             mobile=mobile,
        #             student_time=student_time_str,
        #             student_timezone=student_timezone,
        #             student_country=student_country,
        #         )
        #         return booking



        # ---------- CASE A: chosen slot ----------
        # if chosen_slot:
        #    with transaction.atomic():

        #          schedule = ClassSchedule.objects.select_for_update().get(pk=chosen_slot.pk)

        #          if schedule.student:
        #              raise serializers.ValidationError("Selected slot is already booked. Please choose another slot." )

        #          schedule.student = student
        #          schedule.save(update_fields=["student"])

                 
                 
                 
        if chosen_slot:
           with transaction.atomic():

               try:
                   schedule = ClassSchedule.objects.select_for_update().get(pk=chosen_slot.pk)
               except ClassSchedule.DoesNotExist:
                    raise serializers.ValidationError("Invalid slot selected.")

            #    if schedule.student:
            #        raise serializers.ValidationError("Selected slot is already booked.")
               existing_booking = Booking.objects.filter(
                   slot=schedule
               ).exclude(
                   status=Booking.STATUS_CANCELLED_BY_ADMIN
               ).exists()

               if existing_booking:
                   raise serializers.ValidationError(
                       "Selected slot is already booked."
                   )

               schedule.student = student
               schedule.save(update_fields=["student"])         
               
               
               
               tutor_obj = Tutor.objects.filter(user=schedule.tutor).first()

               booking = Booking.objects.create(
                      student=student,
                      slot=schedule,
                      tutor=tutor_obj,
                      notes=notes,
                      course=course,
                      date=date or schedule.date,
                      time=time_val or schedule.start_time,
                      email=email,
                      name=name,
                      mobile=mobile,
                      student_time=student_time_str,
                      student_timezone=student_timezone,
                      student_country=student_country,
                )

               return booking

        # ---------- CASE B: tutor + date ----------
        # if tutor_obj and date:
        #     with transaction.atomic():
        #         free_slot = TutorSlot.objects.select_for_update().filter(
        #             tutor=tutor_obj, date=date, is_booked=False
        #         ).order_by('start_time').first()

        #         if free_slot:
        #             free_slot.is_booked = True
        #             free_slot.save(update_fields=['is_booked'])

        #             booking = Booking.objects.create(
        #                 student=student,
        #                 slot=free_slot,
        #                 tutor=free_slot.tutor,
        #                 notes=notes,
        #                 course=course,
        #                 date=date,
        #                 time=time_val or free_slot.start_time,
        #                 email=email,
        #                 name=name,
        #                 mobile=mobile,
        #                 student_time=student_time_str,
        #                 student_timezone=student_timezone,
        #                 student_country=student_country,
        #             )
        #             return booking
         

        if tutor_obj and date:
           with transaction.atomic():

            #    free_slot = ClassSchedule.objects.select_for_update().filter(
            #        tutor=tutor_obj,date=date,student__isnull=True
            #    ).order_by('start_time').first()
               free_slot = ClassSchedule.objects.select_for_update().filter(
                    tutor=tutor_obj.user, date=date, student__isnull=True
               ).order_by('start_time').first()
               if free_slot:
                   free_slot.student = student
                   free_slot.save(update_fields=["student"])

                   booking = Booking.objects.create(
                       student=student,
                       slot=free_slot,
                    #    tutor=free_slot.tutor,
                       tutor=tutor_obj,
                       notes=notes,
                       course=course,
                       date=date,
                       time=time_val or free_slot.start_time,
                       email=email,
                       name=name,
                       mobile=mobile,
                       student_time=student_time_str,
                       student_timezone=student_timezone,
                       student_country=student_country,
                   )
                   return booking
        # ---------- CASE C: only date ----------
        # if date:
        #     with transaction.atomic():
        #         free_slot = TutorSlot.objects.select_for_update().filter(
        #             date=date, is_booked=False
        #         ).order_by('tutor', 'start_time').first()

        #         if free_slot:
        #             free_slot.is_booked = True
        #             free_slot.save(update_fields=['is_booked'])
        # ---------- CASE C: only date ----------
        if date:
            with transaction.atomic():

                free_slot = ClassSchedule.objects.select_for_update().filter(
                    date=date,student__isnull=True
                ).order_by('tutor', 'start_time').first()

                if free_slot:

                     free_slot.student = student
                     free_slot.save(update_fields=["student"])

                     booking = Booking.objects.create(
                        student=student,
                        slot=free_slot,
                        # tutor=free_slot.tutor,
                        tutor=Tutor.objects.filter(user=free_slot.tutor).first(),
                        notes=notes,
                        course=course,
                        date=date,
                        time=time_val or free_slot.start_time,
                        email=email,
                        name=name,
                        mobile=mobile,
                        student_time=student_time_str,
                        student_timezone=student_timezone,
                        student_country=student_country,
                     )
                     return booking

        # ---------- CASE D: fallback ----------
        booking = Booking.objects.create(
            student=student,
            slot=None,
            tutor=tutor_obj,
            notes=notes,
            course=course,
            date=date,
            time=time_val,
            email=email,
            name=name,
            mobile=mobile,
            student_time=student_time_str,
            student_timezone=student_timezone,
            student_country=student_country,
        )
        return booking
