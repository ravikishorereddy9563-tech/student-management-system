from django.db import migrations


def seed_notifications(apps, schema_editor):
    Notification = apps.get_model("notifications", "Notification")
    messages = ["Student records are ready for review.", "Default academic data has been loaded.", "Check upcoming examination schedules."]
    for message in messages:
        Notification.objects.get_or_create(message=message)


class Migration(migrations.Migration):
    dependencies = [("notifications", "0001_initial")]
    operations = [migrations.RunPython(seed_notifications, migrations.RunPython.noop)]