from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ExamViewSet, MarkViewSet

router = DefaultRouter()
router.register("marks", MarkViewSet, basename="mark")

router.register(
    r"",
    ExamViewSet,
    basename="exam"
)

urlpatterns = [
    path(
        "",
        include(router.urls)
    ),
]