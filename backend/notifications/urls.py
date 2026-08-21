from rest_framework.routers import DefaultRouter

from .views import AnnouncementViewSet, NotificationViewSet

router = DefaultRouter()
router.register("announcements", AnnouncementViewSet, basename="announcement")
router.register("notifications", NotificationViewSet, basename="notification")
urlpatterns = router.urls