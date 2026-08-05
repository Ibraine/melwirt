from rest_framework import serializers
from .models import ChatSession, Message
from django.contrib.auth import get_user_model

User = get_user_model()


# ================= USER =================
class SimpleUserSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'profile_image'
        ]

    # def get_profile_image(self, obj):
    #     request = self.context.get('request')
    #     if hasattr(obj, 'profile_image') and obj.profile_image and request:
    #         return request.build_absolute_uri(obj.profile_image.url)
    #     return None
    
    # def get_profile_image(self, obj):
    #     request = self.context.get('request')
    #     if hasattr(obj, 'profile_image') and obj.profile_image:
    #        if request:
    #             return request.build_absolute_uri(obj.profile_image.url)
    #        return obj.profile_image.url  # fallback if request is None
    #     return None
    

    def get_profile_image(self, obj):
        request = self.context.get('request')
        if hasattr(obj, 'profile') and obj.profile and obj.profile.profile_image:
            if request:
                 return request.build_absolute_uri(obj.profile.profile_image.url)
            return obj.profile.profile_image.url
        return None

# ================= MESSAGE =================
class MessageSerializer(serializers.ModelSerializer):
    # sender = SimpleUserSerializer(read_only=True)
    
    sender = serializers.SerializerMethodField()

    def get_sender(self, obj):
        return SimpleUserSerializer(obj.sender, context=self.context).data
    sender_id = serializers.PrimaryKeyRelatedField(
        source='sender',
        queryset=User.objects.all(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Message
        fields = [
            'id',
            'session',
            'sender',
            'sender_id',
            'sender_type',
            'text',
            'image',
            'timestamp',
            'read',
        ]
        read_only_fields = ['id', 'sender', 'timestamp', 'read']

    def validate(self, attrs):
        if not attrs.get('text') and not attrs.get('image'):
            raise serializers.ValidationError(
                "Either text or image is required."
            )
        return attrs


# ================= CHAT SESSION =================
class ChatSessionSerializer(serializers.ModelSerializer):
    # student = SimpleUserSerializer(read_only=True)
    # teacher = SimpleUserSerializer(read_only=True)
    student = serializers.SerializerMethodField()
    teacher = serializers.SerializerMethodField()

    def get_student(self, obj):
        return SimpleUserSerializer(obj.student, context=self.context).data

    def get_teacher(self, obj):
        return SimpleUserSerializer(obj.teacher, context=self.context).data

    # 🔥 IMPORTANT: create ke liye required
    student_id = serializers.PrimaryKeyRelatedField(
        source='student',
        queryset=User.objects.all(),
        write_only=True,
        required=False
    )
    teacher_id = serializers.PrimaryKeyRelatedField(
        source='teacher',
        queryset=User.objects.all(),
        write_only=True,
        required=False
    )

    unread_count = serializers.SerializerMethodField()

    class Meta:
        model = ChatSession
        fields = [
            'id',
            'title',
            'student',
            'teacher',
            'student_id',
            'teacher_id',
            'created_at',
            'unread_count'
        ]
        read_only_fields = ['id', 'created_at', 'student', 'teacher']

    def get_unread_count(self, obj):
        user = self.context['request'].user
        return obj.messages.exclude(sender=user).filter(read=False).count()
