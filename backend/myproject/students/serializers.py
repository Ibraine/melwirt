# from rest_framework import serializers
# from .models import StudentProfile, Course, Enrollment, Schedule, Instructor

# class InstructorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Instructor
#         fields = ['id', 'name']

# class CourseSerializer(serializers.ModelSerializer):
#     instructor = InstructorSerializer(read_only=True)

#     class Meta:
#         model = Course
#         fields = ['id', 'title', 'description', 'tutor_name', 'duration_hours', 'instructor']

# class EnrollmentSerializer(serializers.ModelSerializer):
#     course = CourseSerializer(read_only=True)

#     class Meta:
#         model = Enrollment
#         fields = ['course', 'status']

# class ScheduleSerializer(serializers.ModelSerializer):
#     course_title = serializers.CharField(source='course.title', read_only=True)
#     datetime = serializers.DateTimeField(format='%d %b %Y, %I:%M %p')

#     class Meta:
#         model = Schedule
#         fields = ['course_title', 'datetime', 'topic']

# class StudentDashboardSerializer(serializers.Serializer):
#     user = serializers.StringRelatedField()
#     phone = serializers.CharField()
#     hours_spent = serializers.IntegerField()
#     total_courses = serializers.IntegerField()
#     ongoing_courses = EnrollmentSerializer(many=True)
#     upcoming_schedule = ScheduleSerializer(many=True)


# from .models import AssignmentSubmission

# class AssignmentSubmissionSerializer(serializers.ModelSerializer):
#     course_name = serializers.CharField(source='course.title', read_only=True)
#     submission_date = serializers.DateTimeField(format='%d %b, %I:%M %p', read_only=True)
#     status = serializers.CharField(read_only=True)

#     class Meta:
#         model = AssignmentSubmission
#         fields = [
#             'id',
#             'assignment_title',
#             'course',
#             'course_name',
#             'submission_date',
#             'upload_file',
#             'status',
#             'feedback'
#         ]
#         extra_kwargs = {
#             'feedback': {'read_only': True}
#         }
