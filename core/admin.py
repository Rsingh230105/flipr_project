from django.contrib import admin
from .models import Project, Client, ContactSubmission, Subscriber


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'featured', 'live_url', 'created_at')
    search_fields = ('title', 'slug', 'description')
    list_filter = ('featured', 'created_at')
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'website', 'created_at')
    search_fields = ('name', 'company')
    list_filter = ('created_at',)


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'mobile', 'created_at', 'handled')
    search_fields = ('name', 'email', 'message')
    list_filter = ('handled', 'created_at')
    readonly_fields = ('created_at',)


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'active', 'subscribed_at')
    search_fields = ('email', 'name')
    list_filter = ('active',)
