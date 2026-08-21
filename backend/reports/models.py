from django.db import models


class SystemSetting(models.Model):
	college_name = models.CharField(max_length=200, default="ABC College of Engineering")
	email = models.EmailField(default="admin@college.edu")
	phone = models.CharField(max_length=30, default="9876543210")
	notifications = models.BooleanField(default=True)
	updated_at = models.DateTimeField(auto_now=True)
from django.db import models

# Create your models here.
