from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):

    queryset = Student.objects.all()

    serializer_class = StudentSerializer

    permission_classes = [
        IsAuthenticated
    ]

    filter_backends = [
        SearchFilter,
        OrderingFilter
    ]

    search_fields = [
        "admission_number",
        "first_name",
        "last_name",
        "email",
        "phone",
        "course",
        "department",
    ]

    ordering_fields = [
        "created_at",
        "first_name",
        "last_name",
        "admission_number",
    ]

    ordering = [
        "-created_at"
    ]