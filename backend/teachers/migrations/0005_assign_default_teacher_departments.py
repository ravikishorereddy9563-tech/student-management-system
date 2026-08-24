from django.db import migrations


def assign_default_teacher_departments(apps, schema_editor):
    Department = apps.get_model("academics", "Department")
    Teacher = apps.get_model("teachers", "Teacher")

    assignments = {
        "TCH001": "CSE",
        "TCH002": "ECE",
    }

    for employee_id, department_code in assignments.items():
        department = Department.objects.filter(code=department_code, is_active=True).first()
        if department:
            Teacher.objects.filter(employee_id=employee_id).update(department=department)


def clear_default_teacher_departments(apps, schema_editor):
    Teacher = apps.get_model("teachers", "Teacher")
    Teacher.objects.filter(employee_id__in=["TCH001", "TCH002"]).update(department=None)


class Migration(migrations.Migration):

    dependencies = [
        ("academics", "0005_default_classes"),
        ("teachers", "0004_teacher_department"),
    ]

    operations = [
        migrations.RunPython(
            assign_default_teacher_departments,
            clear_default_teacher_departments,
        ),
    ]
