from django.db import models
import requests, json


# Class that models a Search request
class Search(models.Model):
    datetime = models.DateTimeField("date of search", auto_now_add=True)
    query = models.CharField(max_length=32)

    # Saves a new search request
    def saveHistory(query):
        Search(query=query).save()

    def __str__(self):
        return self.query

# Class that model a person from the Torre.ai app.
class Individual(models.Model):
    username = models.CharField(max_length=32, unique=True)
    name = models.CharField(max_length=32, default=None)
    title = models.CharField(max_length=64, default=None, null=True)
    link = models.CharField(max_length=32, default=None, null=True)

    # Get Individual's information from Torre.ai according to the search string provided
    def getData(search_string: str) -> []:
        # Get the data from Torre.ai
        url = "https://torre.ai/api/entities/_searchStream"
        request_data = {
            "query": search_string,
            "identityType": "person",
            "torreGgId": 149472,
            "limit": 10,
            "meta": False,
        }
        torre_response = requests.post(url, json=request_data)

        # Split data to format from ndjson to json
        data = torre_response.content.decode().split("\n")

        # Create Individuals result set
        result = []
        for obj in data:
            if obj:
                individual = json.loads(obj, object_hook=Individual.create_or_update)
                result.append(individual)
        return result

    # Create/update the Individual based on the json object sent by Torre.ai
    @staticmethod
    def create_or_update(obj):
        name = obj['name']
        username = obj['username']
        title = obj['professionalHeadline']
        link = f"https://torre.ai/{username}"
        res, action = Individual.objects.update_or_create(
            username=username,
            defaults={"name": name, "username": username, "title": title, "link": link}
        )
        return res

    def __str__(self):
        return self.name
