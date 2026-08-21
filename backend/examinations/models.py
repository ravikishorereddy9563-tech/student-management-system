from django.db import models


class Exam(models.Model):
    EXAM_TYPES = [
        ("internal", "Internal Exam"),
        ("midterm", "Mid Term"),
        ("semester", "Semester Exam"),
        ("practical", "Practical Exam"),
        ("assignment", "Assignment"),
    ]

    name = models.CharField(
        max_length=150
    )

    exam_type = models.CharField(
        max_length=30,
        choices=EXAM_TYPES,
        default="internal"
    )

    subject = models.CharField(
        max_length=150
    )

    course = models.CharField(
        max_length=150,
        blank=True,
        null=True
    )

    exam_date = models.DateField()

    start_time = models.TimeField(
        blank=True,
        null=True
    )

    end_time = models.TimeField(
        blank=True,
        null=True
    )

    max_marks = models.PositiveIntegerField(
        default=100
    )

    passing_marks = models.PositiveIntegerField(
        default=40
    )

    room_number = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-exam_date", "name"]

    def __str__(self):
        return f"{self.name} - {self.subject}"


class Mark(models.Model):
    student = models.ForeignKey("students.Student", on_delete=models.CASCADE)
    subject = models.ForeignKey("academics.Subject", on_delete=models.CASCADE)
    marks = models.PositiveIntegerField()
    grade = models.CharField(max_length=5, blank=True)

    class Meta:
        unique_together = [("student", "subject")]