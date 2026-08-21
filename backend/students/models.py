from django.db import models


class Student(models.Model):

    GENDER_CHOICES = [
        ("MALE", "Male"),
        ("FEMALE", "Female"),
        ("OTHER", "Other"),
    ]

    STATUS_CHOICES = [
        ("ACTIVE", "Active"),
        ("INACTIVE", "Inactive"),
        ("GRADUATED", "Graduated"),
        ("SUSPENDED", "Suspended"),
    ]

    admission_number = models.CharField(
        max_length=50,
        unique=True
    )

    first_name = models.CharField(
        max_length=100
    )

    last_name = models.CharField(
        max_length=100
    )

    email = models.EmailField(
        unique=True
    )

    phone = models.CharField(
        max_length=15
    )

    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES
    )

    date_of_birth = models.DateField()

    address = models.TextField(
        blank=True
    )

    course = models.CharField(
        max_length=150
    )

    department = models.CharField(
        max_length=150
    )

    year = models.PositiveIntegerField()

    semester = models.PositiveIntegerField()

    guardian_name = models.CharField(
        max_length=150,
        blank=True
    )

    guardian_phone = models.CharField(
        max_length=15,
        blank=True
    )

    profile_photo = models.ImageField(
        upload_to="students/",
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="ACTIVE"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return (
            f"{self.admission_number} - "
            f"{self.first_name} {self.last_name}"
        )