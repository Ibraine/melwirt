from django.db import models
# from django.conf import settings
# from django.utils.timezone import localtime
# from django.utils.translation import gettext_lazy as _

# class Instructor(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name


# class Course(models.Model):
#     title = models.CharField(max_length=100)
#     description = models.TextField()
#     tutor_name = models.CharField(max_length=100, blank=True)  # Optional
#     duration_hours = models.PositiveIntegerField(default=0)
#     instructor = models.ForeignKey(Instructor, on_delete=models.SET_NULL, null=True, blank=True)

#     def __str__(self):
#         return self.title


# class StudentProfile(models.Model):
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     phone = models.CharField(max_length=20, blank=True, null=True)
#     hours_spent = models.IntegerField(default=0)

#     enrolled_courses = models.ManyToManyField(Course, through='Enrollment')

#     timezone = models.CharField(
#         max_length=50,
#         blank=True,
#         null=True,
#         help_text=_("Enter timezone like 'Asia/Kolkata', 'Europe/London'")
#     )

#     def __str__(self):
#         return f"Student: {self.user.username}"


# class Enrollment(models.Model):
#     student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)

#     STATUS_CHOICES = [
#         ('ongoing', 'Ongoing'),
#         ('completed', 'Completed'),
#     ]
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ongoing')

#     def __str__(self):
#         return f"{self.student.user.username} - {self.course.title} ({self.status})"


# class Schedule(models.Model):
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
#     datetime = models.DateTimeField()
#     topic = models.CharField(max_length=200, blank=True)

#     CLASS_TYPE_CHOICES = [
#         ('regular', 'Regular Class'),
#         ('demo', 'Demo Class'),
#     ]
#     class_type = models.CharField(max_length=20, choices=CLASS_TYPE_CHOICES, default='regular')

#     def __str__(self):
#         # Use localtime for timezone aware display in admin etc
#         local_dt = localtime(self.datetime)
#         return f"{self.course.title} [{self.class_type}] on {local_dt.strftime('%d %b %Y %I:%M %p')}"


# class AssignmentSubmission(models.Model):
#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('successful', 'Successful'),
#     ]

#     student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
#     assignment_title = models.CharField(max_length=255)
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
#     submission_date = models.DateTimeField(auto_now_add=True)
#     upload_file = models.FileField(upload_to='assignments/')
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
#     feedback = models.TextField(blank=True, null=True)

#     def __str__(self):
#         return f"{self.assignment_title} - {self.student.user.username} ({self.status})"
