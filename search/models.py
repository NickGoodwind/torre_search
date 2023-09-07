from django.db import models


# Create your models here.
class Search(models.Model):
    datetime = models.DateTimeField("date of search", auto_now_add=True)
    query = models.CharField(max_length=32)

    def __str__(self):
        return self.query


class Individual(models.Model):
    username = models.CharField(max_length=32, unique=True)
    name = models.CharField(max_length=32, default=None)
    title = models.CharField(max_length=64, default=None, null=True)
    link = models.CharField(max_length=32, default=None, null=True)

    def __str__(self):
        return self.name
