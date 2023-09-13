# Generated by Django 4.2.4 on 2023-09-07 17:46

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Individual",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("username", models.CharField(max_length=32, unique=True)),
                ("name", models.CharField(default=None, max_length=32)),
                ("title", models.CharField(default=None, max_length=64, null=True)),
                ("link", models.CharField(default=None, max_length=32, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Search",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "datetime",
                    models.DateTimeField(
                        auto_now_add=True, verbose_name="date of search"
                    ),
                ),
                ("query", models.CharField(max_length=32)),
            ],
        ),
    ]