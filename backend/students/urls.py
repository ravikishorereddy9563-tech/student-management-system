from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import StudentViewSet


router = DefaultRouter()

router.register(
    r"",
    StudentViewSet,
    basename="student"
)

urlpatterns = [
    path(
        "",
        include(router.urls)
    ),
]