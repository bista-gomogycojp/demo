# Generated by Django 2.2.1 on 2021-07-01 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20210701_2008'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='code',
            field=models.CharField(max_length=255, verbose_name='番号'),
        ),
    ]
