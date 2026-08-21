from datetime import date
from django.db import migrations


def seed_exams_marks(apps, schema_editor):
    Exam = apps.get_model("examinations", "Exam")
    Mark = apps.get_model("examinations", "Mark")
    Student = apps.get_model("students", "Student")
    Subject = apps.get_model("academics", "Subject")
    subject = Subject.objects.first()
    if not subject:
        return
    exam, _ = Exam.objects.get_or_create(name="First Internal Exam", subject=subject.name, defaults={"exam_date": date.today(), "room_number": "Room 101"})
    for student in Student.objects.all():
        Mark.objects.get_or_create(student=student, subject=subject, defaults={"marks": 80, "grade": "A"})


class Migration(migrations.Migration):
    dependencies = [("examinations", "0002_mark"), ("academics", "0004_default_subjects")]
    operations = [migrations.RunPython(seed_exams_marks, migrations.RunPython.noop)]