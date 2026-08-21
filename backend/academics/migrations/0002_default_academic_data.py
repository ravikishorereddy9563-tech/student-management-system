from django.db import migrations


def create_default_academic_data(apps, schema_editor):
    Department = apps.get_model("academics", "Department")
    Course = apps.get_model("academics", "Course")

    departments = [
        ("Computer Science and Engineering", "CSE"),
        ("Electronics and Communication Engineering", "ECE"),
        ("Mechanical Engineering", "MECH"),
        ("Electrical and Electronics Engineering", "EEE"),
    ]

    for name, code in departments:
        department, _ = Department.objects.get_or_create(
            code=code,
            defaults={"name": name},
        )
        Course.objects.get_or_create(
            code=f"{code}-UG",
            defaults={
                "department": department,
                "name": f"{name} Undergraduate",
                "duration_years": 4,
            },
        )


def remove_default_academic_data(apps, schema_editor):
    Department = apps.get_model("academics", "Department")
    Department.objects.filter(code__in=["CSE", "ECE", "MECH", "EEE"]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("academics", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(
            create_default_academic_data,
            remove_default_academic_data,
        ),
    ]