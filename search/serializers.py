from rest_framework import serializers
from .models import Individual, Search

class IndividualSerializer(serializers.ModelSerializer):
    class Meta:
        model = Individual
        fields = ('pk', 'username', 'name', 'title', 'link')

class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Search
        fields = ('pk', 'query', 'datetime')