from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):

    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Student

        fields = [
            "id",
            "admission_number",
            "first_name",
            "last_name",
            "full_name",
            "email",
            "phone",
            "gender",
            "date_of_birth",
            "address",
            "course",
            "department",
            "year",
            "semester",
            "guardian_name",
            "guardian_phone",
            "profile_photo",
            "status",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "full_name",
            "created_at",
            "updated_at",
        ]

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"