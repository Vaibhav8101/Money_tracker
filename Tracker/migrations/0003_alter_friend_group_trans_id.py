# Generated by Django 4.1.5 on 2023-01-13 10:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Tracker', '0002_remove_transaction_friend_friend_group'),
    ]

    operations = [
        migrations.AlterField(
            model_name='friend_group',
            name='trans_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='Tracker.transaction'),
        ),
    ]