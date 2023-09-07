from django.shortcuts import render
from django.views import generic
from django.http import HttpResponse
from django_tables2 import SingleTableView
from .models import Individual, Search
from.tables import HistoryTable, SearchTable
import requests, json


def index(request):
    return HttpResponse(render(request, "search/index.html", {"title": "My amazing contact finder in Torre.ai"}))


def search(request):
    # Get query parameters
    query = request.GET['q']
    if not query:
        return render(
            request,
            "search/index.html",
            {
                "error_message": "You didn't select a choice.",
            },
        )

    # Process search here and add history
    Search(query=query).save()
    url = "https://torre.ai/api/entities/_searchStream"
    data = {
        "query": query,
        "identityType": "person",
        "torreGgId": 149472,
        "limit": 20,
        "meta": False,
    }
    response = requests.post(url, json=data)
    response = response.content.decode().split("\n")

    # Create structured result set
    resultSet = []
    for obj in response:
        if obj:
            individual = json.loads(obj, object_hook=Individual.decode)
            resultSet.append(individual)

    # Show table
    table = SearchTable(resultSet)
    table.paginate(per_page=10)
    return render(request, "search/results.html", {"table": table, "title": "Search results"})


class DetailView(generic.DetailView):
    model = Individual
    template_name = "search/detail.html"


class HistoryView(SingleTableView):
    model = Search
    table_class = HistoryTable
    template_name = "search/history.html"
    context_object_name = "latest_query"
    paginate_by = 10

    def get_queryset(self):
        return Search.objects.order_by("-datetime")


def favorite(request, pk):
    return HttpResponse("You're favouring an individual %s." % pk)


def save(request, pk):
    return HttpResponse("You're saving an individual %s." % pk)
