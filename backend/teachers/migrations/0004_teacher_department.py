from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("academics", "0005_default_classes"),
        ("teachers", "0003_default_teachers"),
    ]

    operations = [
        migrations.AddField(
            model_name="teacher",
            name="department",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="teachers",
                to="academics.department",
            ),
        ),
    ]