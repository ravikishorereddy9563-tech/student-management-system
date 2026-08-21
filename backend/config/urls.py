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

    path(
        "",
        home,
        name="home"
    ),

    path(
        "admin/",
        admin.site.urls
    ),

    path(
        "api/auth/",
        include("accounts.urls")
    ),

    path(
        "api/auth/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),

    path(
        "api/students/",
        include("students.urls")
    ),

    path(
        "api/academics/",
        include("academics.urls")
    ),

    path(
        "api/attendance/",
        include("attendance.urls")
    ),

    path(
        "api/exams/",
        include("examinations.urls")
    ),

    path(
        "api/fees/",
        include("fees.urls")
    ),
    path("api/teachers/", include("teachers.urls")),
    path("api/notifications/", include("notifications.urls")),
    path("api/reports/", include("reports.urls")),
]