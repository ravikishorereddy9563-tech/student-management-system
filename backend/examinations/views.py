from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Exam, Mark
from .extra_serializers import MarkSerializer


class MarkViewSet(viewsets.ModelViewSet):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer
    permission_classes = [IsAuthenticated]
from .serializers import ExamSerializer


class ExamViewSet(viewsets.ModelViewSet):

    queryset = Exam.objects.all()

    serializer_class = ExamSerializer

    permission_classes = [
        IsAuthenticated
    ]