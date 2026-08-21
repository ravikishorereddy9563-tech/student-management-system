from django.db import migrations


def seed_classes(apps, schema_editor):
    ClassRoom = apps.get_model("academics", "ClassRoom")
    defaults = [
        ("CSE-A", "Computer Science - A", 1, "Room 101", "09:00"),
        ("ECE-A", "Electronics - A", 1, "Room 102", "10:00"),
        ("MECH-A", "Mechanical - A", 1, "Room 201", "11:00"),
    ]
    for code, name, year, room, start_time in defaults:
        ClassRoom.objects.get_or_create(code=code, defaults={"name": name, "year": year, "room": room, "start_time": start_time})


class Migration(migrations.Migration):
    dependencies = [("academics", "0004_default_subjects")]
    operations = [migrations.RunPython(seed_classes, migrations.RunPython.noop)]