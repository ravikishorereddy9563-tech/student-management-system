from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Fee
from .serializers import FeeSerializer


class FeeViewSet(viewsets.ModelViewSet):

    queryset = Fee.objects.all()

    serializer_class = FeeSerializer

    permission_classes = [
        IsAuthenticated
    ]