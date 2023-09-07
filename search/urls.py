from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("history", views.HistoryView.as_view(), name="history"),
    path("detail/<int:id>/", views.DetailView.as_view(), name="detail"),
    path("search", views.search, name="search"),
    path("favorite", views.favorite, name="favorite"),
    path("save", views.save, name="save"),
]