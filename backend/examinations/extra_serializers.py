from rest_framework import serializers

from .models import Mark


class MarkSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()

    class Meta:
        model = Mark
        fields = "__all__"
        read_only_fields = ["student_name"]

    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}"