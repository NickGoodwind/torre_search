from django.utils.html import format_html
import django_tables2 as tables
from .models import Individual, Search

class SearchTable(tables.Table):
    class Meta:
        model = Individual
        template_name = "django_tables2/bootstrap5-responsive.html"
        fields = ("id", "name", "title", "link")
        attrs = {"class": "round table table-sm table-dark table-striped table.bordered table-hover"}
        row_attrs = {"onclick": lambda record, table: f"showDetail({record.id}, {table.context.request.GET.get('q')})"}

    link = tables.Column()

    def render_link(self, value, record):
        return format_html(f"<a href=\"{value}\">{record.username}</a>")

class HistoryTable(tables.Table):
    class Meta:
        model = Search
        template_name = "django_tables2/bootstrap5-responsive.html"
        order_by = tables.utils.OrderBy("-datetime")
        attrs = {"class": "round table table-sm table-dark table-striped table.bordered table-hover"}