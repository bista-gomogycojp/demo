# Generated by Django 2.2.1 on 2021-07-01 10:05

import categorybox.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='タイトル')),
                ('place', models.IntegerField(verbose_name='位置')),
                ('is_active', models.IntegerField(blank=True, choices=[(1, 'Active'), (0, 'Inactive')], default=1, help_text='Active->効化, Inactive->無効化', null=True, verbose_name='状態')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='作成日')),
                ('modified', models.DateTimeField(auto_now=True, verbose_name='更新日')),
            ],
            options={
                'verbose_name_plural': 'カテゴリー名',
                'db_table': 'category',
            },
        ),
        migrations.CreateModel(
            name='CategoryItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='タイトル')),
                ('url', models.CharField(max_length=200, verbose_name='リンク')),
                ('place', models.IntegerField(verbose_name='位置')),
                ('image', models.ImageField(blank=True, null=True, upload_to=categorybox.models.upload_location, verbose_name='画像')),
                ('is_active', models.IntegerField(blank=True, choices=[(1, 'Active'), (0, 'Inactive')], default=1, help_text='Active->効化, Inactive->無効化', null=True, verbose_name='状態')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='作成日')),
                ('modified', models.DateTimeField(auto_now=True, verbose_name='更新日')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='categorybox.Category', verbose_name='カテゴリー')),
            ],
            options={
                'verbose_name_plural': 'カテゴリー項目',
                'db_table': 'category_item',
            },
        ),
    ]