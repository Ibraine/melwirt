from rest_framework import serializers
from .models import Referral

class ReferralSerializer(serializers.ModelSerializer):
    reward_by_name = serializers.CharField(source='reward_by.name', read_only=True)
    refer_to_name = serializers.CharField(source='refer_to.name', read_only=True)
    refer_to_email = serializers.CharField(source='refer_to.email', read_only=True)

    class Meta:
        model = Referral
        fields = "__all__"
