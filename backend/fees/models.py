from django.db import models

# Create your models here.
from django.db import models


class Fee(models.Model):

    FEE_TYPES = [
        ("tuition", "Tuition Fee"),
        ("exam", "Examination Fee"),
        ("library", "Library Fee"),
        ("hostel", "Hostel Fee"),
        ("transport", "Transport Fee"),
        ("other", "Other"),
    ]

    PAYMENT_STATUS = [
        ("pending", "Pending"),
        ("partial", "Partially Paid"),
        ("paid", "Paid"),
        ("overdue", "Overdue"),
    ]

    student_id = models.CharField(
        max_length=50
    )

    student_name = models.CharField(
        max_length=150
    )

    fee_type = models.CharField(
        max_length=30,
        choices=FEE_TYPES,
        default="tuition"
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    paid_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    due_date = models.DateField()

    payment_date = models.DateField(
        blank=True,
        null=True
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS,
        default="pending"
    )

    transaction_id = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    payment_method = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    description = models.TextField(
        blank=True,
        null=True
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
        return f"{self.student_name} - {self.fee_type} - {self.amount}"