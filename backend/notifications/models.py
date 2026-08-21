from django.db import models


class Announcement(models.Model):
	title = models.CharField(max_length=200)
	content = models.TextField()
	announcement_type = models.CharField(max_length=50, default="General")
	is_published = models.BooleanField(default=True)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ["-created_at"]


class Notification(models.Model):
	message = models.CharField(max_length=255)
	is_read = models.BooleanField(default=False)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ["-created_at"]
from django.db import models

# Create your models here.
