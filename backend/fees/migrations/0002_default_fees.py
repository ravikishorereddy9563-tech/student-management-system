from datetime import date, timedelta
from django.db import migrations


def seed_fees(apps, schema_editor):
    Student = apps.get_model("students", "Student")
    Fee = apps.get_model("fees", "Fee")
    for student in Student.objects.all():
        Fee.objects.get_or_create(student_id=student.admission_number, defaults={"student_name": f"{student.first_name} {student.last_name}", "amount": 80000, "paid_amount": 60000, "due_date": date.today() + timedelta(days=30), "payment_status": "partial"})


class Migration(migrations.Migration):
    dependencies = [("fees", "0001_initial"), ("students", "0001_initial")]
    operations = [migrations.RunPython(seed_fees, migrations.RunPython.noop)]