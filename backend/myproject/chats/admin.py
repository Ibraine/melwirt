from django.contrib import admin
from .models import ChatSession, Message

@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'student', 'teacher', 'created_at')
    search_fields = ('title', 'student__username', 'teacher__username')
    list_filter = ('created_at',)

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'session', 'sender', 'sender_type', 'timestamp', 'read')
    search_fields = ('sender__username', 'text')
    list_filter = ('sender_type', 'read', 'timestamp')
