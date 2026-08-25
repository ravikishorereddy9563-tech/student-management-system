from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path

from rest_framework_simplejwt.views import TokenRefreshView


def home(request):
    return JsonResponse({
        "success": True,
        "message": "Student Management System Backend is running.",
        "status": "online",
    })


urlpatterns = [
    # Home
    path(
        "",
        home,
        name="home",
    ),

    # Admin
    path(
        "admin/",
        admin.site.urls,
    ),

    # Authentication
    path(
        "api/auth/",
        include("accounts.urls"),
    ),

    path(
        "api/auth/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),

    # Students
    path(
        "api/students/",
        include("students.urls"),
    ),

    # Academics
    path(
        "api/academics/",
        include("academics.urls"),
    ),

    # Attendance
    path(
        "api/attendance/",
        include("attendance.urls"),
    ),

    # Examinations
    path(
        "api/exams/",
        include("examinations.urls"),
    ),

    # Fees
    path(
        "api/fees/",
        include("fees.urls"),
    ),

    # Teachers
    path(
        "api/teachers/",
        include("teachers.urls"),
    ),

    # Notifications
    path(
        "api/notifications/",
        include("notifications.urls"),
    ),

    # Reports
    path(
        "api/reports/",
        include("reports.urls"),
    ),
]