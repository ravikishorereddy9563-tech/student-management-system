from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import FeeViewSet


router = DefaultRouter()

router.register(
    r"",
    FeeViewSet,
    basename="fee"
)

urlpatterns = [
    path(
        "",
        include(router.urls)
    ),
]