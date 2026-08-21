from django.db import migrations


def create_default_teachers(apps, schema_editor):
    Teacher = apps.get_model("teachers", "Teacher")

    teachers = [
        {
            "employee_id": "TCH001",
            "first_name": "Priya",
            "last_name": "Sharma",
            "email": "priya.sharma@example.com",
            "phone": "9000000001",
            "qualification": "M.Tech Computer Science",
            "specialization": "Data Structures",
            "joining_date": "2024-06-01",
        },
        {
            "employee_id": "TCH002",
            "first_name": "Arun",
            "last_name": "Kumar",
            "email": "arun.kumar@example.com",
            "phone": "9000000002",
            "qualification": "M.E. Electronics",
            "specialization": "Embedded Systems",
            "joining_date": "2023-07-15",
        },
    ]

    for teacher in teachers:
        Teacher.objects.get_or_create(
            employee_id=teacher["employee_id"],
            defaults=teacher,
        )


def remove_default_teachers(apps, schema_editor):
    Teacher = apps.get_model("teachers", "Teacher")
    Teacher.objects.filter(employee_id__in=["TCH001", "TCH002"]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("teachers", "0002_rename_department_teacher_qualification_and_more"),
    ]

    operations = [
        migrations.RunPython(
            create_default_teachers,
            remove_default_teachers,
        ),
    ]