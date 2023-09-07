from django.utils.html import format_html
import django_tables2 as tables
from .models import Individual, Search

class SearchTable(tables.Table):
    class Meta:
        model = Individual
        template_name = "django_tables2/bootstrap.html"
        fields = ("id", "name", "title", "link")

    link = tables.Column()

    def render_link(self, value, record):
        return format_html(f"<a href=\"{value}\">{record.username}</a>")

class HistoryTable(tables.Table):
    class Meta:
        model = Search
        template_name = "django_tables2/bootstrap.html"
        order_by = tables.utils.OrderBy("id")