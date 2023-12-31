# Generated by Django 4.2.3 on 2023-09-21 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MAIN', '0002_remove_solicitudes_empleado_departamento_token_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='solicitudes',
            name='email',
            field=models.EmailField(default='exm@gmail.com', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='solicitudes',
            name='name',
            field=models.CharField(default='User', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='solicitudes',
            name='quantity_asked',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
