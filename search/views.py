from django.shortcuts import render
from django.views import generic
from django.http import HttpResponse

from django_tables2 import SingleTableView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import *
from .tables import HistoryTable, SearchTable
from .models import Individual, Search


# #################################
# REST endpoints
# #################################
@api_view((['GET']))
def rest_search(request):
    if request.method == 'GET':
        # Execute torre search and load data in persisten DB
        query = request.GET.get('name')
        if query:
            Individual.getData(query)

        # Prepare and return data for REST endpoint
        data = Individual.objects.all().filter(name__contains=query)[:10]
        serializer = IndividualSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view((['GET']))
def rest_history(request):
    if request.method == 'GET':
        # Prepare and return data for REST endpoint
        data = Search.objects.all().order_by('-datetime')
        serializer = SearchSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


# #################################
# Views for direct Django MVC system
# #################################
def index(request):
    return HttpResponse(render(request, "search/index.html", {"title": "My amazing contact finder in Torre.ai"}))


def search(request):
    # Get query parameters
    query = request.GET.get('q')
    if not query:
        return render(
            request,
            "search/index.html",
            {
                "error_message": "You didn't select a choice.",
            },
        )

    # Process search here and add history
    Search.saveHistory(query)
    data = Individual.getData(query)

    # Create table
    table = SearchTable(data)
    table.paginate(page=1, per_page=10)

    # Show table
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
