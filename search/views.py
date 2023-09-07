from django.shortcuts import render
from django.views import generic
from django.http import HttpResponse
from django_tables2 import SingleTableView
from .models import Individual, Search
import requests, json


def index(request):
    return HttpResponse(render(request, "search/index.html", {"title": "My amazing contact finder in Torre.ai"}))


def search(request):
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
    return HttpResponse("You're favoriting an individual %s." % pk)


def save(request, pk):
    return HttpResponse("You're saving an individual %s." % pk)
