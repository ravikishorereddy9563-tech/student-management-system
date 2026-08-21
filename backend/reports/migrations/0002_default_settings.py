from django.db import migrations


def seed_settings(apps, schema_editor):
    SystemSetting = apps.get_model("reports", "SystemSetting")
    SystemSetting.objects.get_or_create(id=1)


class Migration(migrations.Migration):
    dependencies = [("reports", "0001_initial")]
    operations = [migrations.RunPython(seed_settings, migrations.RunPython.noop)]