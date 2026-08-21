from datetime import date
from django.db import migrations


def seed_attendance(apps, schema_editor):
    Student = apps.get_model("students", "Student")
    Subject = apps.get_model("academics", "Subject")
    Attendance = apps.get_model("attendance", "Attendance")
    subject = Subject.objects.first()
    if not subject:
        return
    for index, student in enumerate(Student.objects.all()):
        Attendance.objects.get_or_create(student=student, subject=subject, date=date.today(), defaults={"status": "present" if index % 2 == 0 else "absent"})


class Migration(migrations.Migration):
    dependencies = [("attendance", "0001_initial"), ("academics", "0004_default_subjects")]
    operations = [migrations.RunPython(seed_attendance, migrations.RunPython.noop)]