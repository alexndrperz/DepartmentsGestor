# Generated by Django 4.2.3 on 2023-09-30 16:36

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('MAIN', '0007_user_email_alter_almacen_recinto_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='solicitudes',
            name='createdAt',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]