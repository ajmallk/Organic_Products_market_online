from django.contrib import admin
from .models import Product, ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    """Display contact messages neatly in the Django admin panel."""
    list_display = ('name', 'email', 'subject', 'submitted_at')
    list_filter = ('submitted_at',)
    search_fields = ('name', 'email', 'subject')
    readonly_fields = ('submitted_at',)


admin.site.register(Product)
