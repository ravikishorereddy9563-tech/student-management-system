from rest_framework import serializers

from academics.models import Department
from .models import Teacher


class TeacherSerializer(serializers.ModelSerializer):
    department = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.filter(is_active=True),
        required=True,
    )

    class Meta:
        model = Teacher
        fields = "__all__"