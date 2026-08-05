# Create your views here.
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

from .serializers import RegisterSerializer, UserSerializer, MyTokenObtainPairSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer
    queryset = User.objects.all()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)



#Forgot Password View
import random
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth import get_user_model

from .models import PasswordResetOTP
from .utils import hash_otp

User = get_user_model()

class ForgotPasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        user = User.objects.filter(email=email).first()

        if not user:
            return Response({"error": "User not found"}, status=404)

        # 🔥 invalidate old OTPs
        PasswordResetOTP.objects.filter(
            user=user, is_used=False
        ).update(is_used=True)

        otp = str(random.randint(100000, 999999))

        PasswordResetOTP.objects.create(
            user=user,
            otp_hash=hash_otp(otp)
        )

        send_mail(
            "Reset Password OTP",
            f"Your OTP is {otp}. Valid for 10 minutes.",
            "noreply@yourapp.com",
            [user.email],
        )

        return Response({"message": "OTP sent"})


#Verify OTP View

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from .models import PasswordResetOTP, PasswordResetToken
from .utils import hash_otp

class VerifyOTPView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"error": "Invalid email"}, status=400)

        otp_obj = PasswordResetOTP.objects.filter(
            user=user,
            otp_hash=hash_otp(otp),
            is_used=False
        ).last()

        if not otp_obj or otp_obj.is_expired():
            return Response({"error": "OTP expired or invalid"}, status=400)

        otp_obj.is_used = True
        otp_obj.save()

        # 🔥 single active token
        PasswordResetToken.objects.filter(user=user).delete()
        token = PasswordResetToken.objects.create(user=user)

        return Response({"reset_token": token.token})


#Reset Password View
class ResetPasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        token = request.data.get("reset_token")
        password = request.data.get("new_password")

        reset_obj = PasswordResetToken.objects.filter(token=token).first()
        if not reset_obj or reset_obj.is_expired():
            return Response({"error": "Token expired"}, status=400)

        user = reset_obj.user
        user.set_password(password)
        user.save()

        reset_obj.delete()

        return Response({"message": "Password reset successful"})
