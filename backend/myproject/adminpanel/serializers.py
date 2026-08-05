# adminpanel/serializers.py
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from rest_framework import serializers
from booking.models import Tutor

User = get_user_model()

# Small validator for image size
def validate_image(file):
    max_mb = 3
    if file.size > max_mb * 1024 * 1024:
        raise serializers.ValidationError(f"Image too large. Max {max_mb}MB.")
    return file


# ---------------- User Serializers ----------------

class UserListSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField(read_only=True)
    profile_image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['id','email','first_name','last_name','full_name','username','role','phone','is_active','profile_image','is_staff','is_superuser']
        read_only_fields = ['id','email']

    def get_full_name(self, obj):
        return (obj.first_name or '') + ' ' + (obj.last_name or '')


class UserDetailSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False, allow_null=True, validators=[validate_image])

    class Meta:
        model = User
        fields = ['id','email','first_name','last_name','username','role','phone','about','profile_image','is_active','is_staff','is_superuser','date_joined']
        read_only_fields = ['id','email','date_joined']


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=6)
    profile_image = serializers.ImageField(required=False, allow_null=True, validators=[validate_image])

    class Meta:
        model = User
        fields = [
            'email','password','first_name','last_name','role',
            'phone','about','profile_image','is_staff','is_superuser'
        ]

    def create(self, validated_data):
        pwd = validated_data.pop('password')
        is_staff_flag = validated_data.pop('is_staff', None)
        is_superuser_flag = validated_data.pop('is_superuser', None)
        role = validated_data.get('role', 'student')

        user = User.objects.create(**validated_data)
        user.set_password(pwd)

        # Default flags based on role
        if role == 'admin':
            user.is_staff = True if is_staff_flag is None else bool(is_staff_flag)
            user.is_superuser = True if is_superuser_flag is None else bool(is_superuser_flag)
        elif role == 'tutor':
            user.is_staff = True if is_staff_flag is None else bool(is_staff_flag)
            user.is_superuser = bool(is_superuser_flag) if is_superuser_flag is not None else False
        else:
            user.is_staff = bool(is_staff_flag) if is_staff_flag is not None else False
            user.is_superuser = bool(is_superuser_flag) if is_superuser_flag is not None else False

        user.save()

        # Create Tutor row when role == tutor
        if role == 'tutor':
            Tutor.objects.create(user=user, bio='', phone=user.phone or '')

        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False, allow_null=True, validators=[validate_image])

    class Meta:
        model = User
        fields = [
            'first_name','last_name','username','phone','about','profile_image',
            'is_active','role','is_staff','is_superuser'
        ]

    def update(self, instance, validated_data):
        request = self.context.get('request', None)
        if 'is_superuser' in validated_data:
            if request and not request.user.is_superuser:
                validated_data.pop('is_superuser', None)
        return super().update(instance, validated_data)


# ---------------- Tutor Serializers ----------------

class TutorListSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField(read_only=True)
    profile_image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['id','email','first_name','last_name','full_name','username','phone','is_active','profile_image','is_staff','is_superuser']
        read_only_fields = ['id','email']

    def get_full_name(self, obj):
        return (obj.first_name or '') + ' ' + (obj.last_name or '')


class TutorDetailSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False, allow_null=True, validators=[validate_image])
    bio = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','email','first_name','last_name','username','phone','bio','profile_image','is_active','is_staff','is_superuser','date_joined']
        read_only_fields = ['id','email','date_joined']

    def get_bio(self, obj):
        try:
            tutor = Tutor.objects.get(user=obj)
            return tutor.bio
        except Tutor.DoesNotExist:
            return ''


class TutorCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=6)
    profile_image = serializers.ImageField(required=False, allow_null=True, validators=[validate_image])
    bio = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['email','password','first_name','last_name','phone','bio','profile_image','is_staff','is_superuser']

    def create(self, validated_data):
        bio = validated_data.pop('bio', '')
        pwd = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(pwd)
        user.role = 'tutor'
        user.is_staff = validated_data.get('is_staff', True)
        user.is_superuser = validated_data.get('is_superuser', False)
        user.save()
        Tutor.objects.create(user=user, bio=bio, phone=user.phone or '')
        return user


class TutorUpdateSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False, allow_null=True, validators=[validate_image])
    bio = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['first_name','last_name','username','phone','bio','profile_image','is_active','is_staff','is_superuser']

    def update(self, instance, validated_data):
        bio = validated_data.pop('bio', None)
        instance = super().update(instance, validated_data)
        if bio is not None:
            tutor, _ = Tutor.objects.get_or_create(user=instance)
            tutor.bio = bio
            tutor.phone = instance.phone
            tutor.save()
        return instance


# ---------------- Permission Serializer ----------------

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('id', 'codename', 'name', 'content_type')
