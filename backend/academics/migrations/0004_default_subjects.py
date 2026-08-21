from django.db import migrations


def seed_subjects(apps, schema_editor):
    Course = apps.get_model("academics", "Course")
    Subject = apps.get_model("academics", "Subject")
    for course in Course.objects.all():
        Subject.objects.get_or_create(
            code=f"{course.code}-101",
            defaults={"course": course, "name": f"Introduction to {course.name}", "semester": 1, "credits": 3},
        )


class Migration(migrations.Migration):
    dependencies = [("academics", "0003_classroom")]
    operations = [migrations.RunPython(seed_subjects, migrations.RunPython.noop)]