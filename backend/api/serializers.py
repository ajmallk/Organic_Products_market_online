from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, ContactMessage

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class ProductSerializer(serializers.ModelSerializer):
    seller_name = serializers.ReadOnlyField(source='seller.username')

    class Meta:
        model = Product
        fields = ['id', 'seller', 'seller_name', 'name', 'image', 'whatsapp_number', 'location', 'description', 'created_at']
        read_only_fields = ['seller', 'created_at']


class ContactMessageSerializer(serializers.ModelSerializer):
    """Serializer for the ContactMessage model used by the Contact Us form."""

    class Meta:
        model = ContactMessage
        # All writable fields except submitted_at which is set automatically
        fields = ['id', 'name', 'email', 'subject', 'message', 'submitted_at']
        read_only_fields = ['submitted_at']
