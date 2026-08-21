from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from students.models import Student
from teachers.models import Teacher
from .models import ClassRoom, Course, Department, Subject
from .extra_serializers import ClassRoomSerializer


class ClassRoomViewSet(viewsets.ModelViewSet):
    queryset = ClassRoom.objects.all()
    serializer_class = ClassRoomSerializer
    permission_classes = [IsAuthenticated]
from .serializers import CourseSerializer, DepartmentSerializer, SubjectSerializer


class AcademicHomeView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "success": True,
            "message": "Academics API is working."
        })


class DashboardSummaryView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        recent_students = Student.objects.all()[:5]

        return Response({
            "statistics": {
                "students": Student.objects.count(),
                "teachers": Teacher.objects.count(),
                "courses": Course.objects.count(),
                "departments": Department.objects.count(),
            },
            "recent_students": [
                {
                    "id": student.id,
                    "admission_number": student.admission_number,
                    "full_name": f"{student.first_name} {student.last_name}",
                    "course": student.course,
                    "status": student.status,
                }
                for student in recent_students
            ],
        })


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.select_related("department").all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.select_related("course").all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]