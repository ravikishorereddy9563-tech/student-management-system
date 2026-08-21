from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    AcademicHomeView,
    CourseViewSet,
    DashboardSummaryView,
    DepartmentViewSet,
    SubjectViewSet,
    ClassRoomViewSet,
)

router = DefaultRouter()
router.register("departments", DepartmentViewSet, basename="department")
router.register("courses", CourseViewSet, basename="course")
router.register("subjects", SubjectViewSet, basename="subject")
router.register("classes", ClassRoomViewSet, basename="class")


urlpatterns = [
    *router.urls,
    path(
        "dashboard/",
        DashboardSummaryView.as_view(),
        name="dashboard-summary",
    ),
    path(
        "",
        AcademicHomeView.as_view(),
        name="academics-home"
    ),
]