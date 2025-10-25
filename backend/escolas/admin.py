from django.contrib import admin
from .models import Escola

@admin.register(Escola)

class EscolaAdmin(admin.ModelAdmin):
    list_display = ['nome', 'endereco', 'telefone']
    search_fields = ['nome', 'endereco']
    list_filter = ['nome']