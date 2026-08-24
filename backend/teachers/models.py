from django.db import models


class Teacher(models.Model):
    department = models.ForeignKey(
        "academics.Department",
        on_delete=models.SET_NULL,
        related_name="teachers",
        null=True,
        blank=True,
    )
    employee_id = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    qualification = models.CharField(max_length=150)
    specialization = models.CharField(max_length=150, blank=True)
    joining_date = models.DateField()
    address = models.TextField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=[
            ("active", "Active"),
            ("inactive", "Inactive"),
        ],
        default="active",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.employee_id} - {self.first_name} {self.last_name}"