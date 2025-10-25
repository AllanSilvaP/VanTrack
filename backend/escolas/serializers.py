from rest_framework import serializers
from .models import Escola

class EscolaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Escola
        fields = ['id', 'nome', 'endereco', 'telefone', 'latitude', 'longitude']