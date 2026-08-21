from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):

    list_display = [
        "admission_number",
        "first_name",
        "last_name",
        "email",
        "course",
        "department",
        "year",
        "semester",
        "status",
    ]

    search_fields = [
        "admission_number",
        "first_name",
        "last_name",
        "email",
    ]

    list_filter = [
        "gender",
        "course",
        "department",
        "year",
        "semester",
        "status",
    ]

    ordering = [
        "-created_at"
    ]