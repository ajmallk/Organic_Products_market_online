from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    """Represents a product listing posted by a seller."""
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='product_images/')
    whatsapp_number = models.CharField(max_length=20)
    location = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    """Stores messages submitted through the public Contact Us form."""
    name = models.CharField(max_length=150)          # Sender's full name
    email = models.EmailField()                       # Sender's email address
    subject = models.CharField(max_length=255)        # Brief subject line
    message = models.TextField()                      # Main message body
    submitted_at = models.DateTimeField(auto_now_add=True)  # Timestamp

    def __str__(self):
        return f"Message from {self.name} – {self.subject}"
