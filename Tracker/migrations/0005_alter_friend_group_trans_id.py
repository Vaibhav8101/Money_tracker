# Generated by Django 4.1.5 on 2023-01-13 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tracker', '0004_alter_friend_group_trans_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='friend_group',
            name='trans_id',
            field=models.CharField(max_length=100),
        ),
    ]
