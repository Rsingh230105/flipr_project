import re
from rest_framework import serializers
from .models import Project, Client, ContactSubmission, Subscriber


_MOBILE_RE = re.compile(r'^\+?\d{7,15}$')


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description', 'thumbnail', 'cover_image',
            'live_url', 'created_at', 'featured'
        ]
        read_only_fields = ['id', 'created_at']


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'company', 'logo', 'testimonial', 'website', 'created_at']
        read_only_fields = ['id', 'created_at']


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['id', 'name', 'email', 'mobile', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_email(self, value: str) -> str:
        if not value or '@' not in value:
            raise serializers.ValidationError("Please provide a valid email address.")
        return value

    def validate_mobile(self, value: str) -> str:
        if value and not _MOBILE_RE.match(value):
            raise serializers.ValidationError(
                "Mobile number format invalid. Use digits, optional leading + and 7-15 digits."
            )
        return value


class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ['id', 'email', 'name', 'subscribed_at', 'active']
        read_only_fields = ['id', 'subscribed_at']

    def validate_email(self, value: str) -> str:
        if not value or '@' not in value:
            raise serializers.ValidationError("Please provide a valid email address.")
        return value
