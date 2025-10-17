from rest_framework import serializers
from .models import Filho
from usuarios.models import Usuario
from escolas.models import Escola

class FilhoSerializer (serializers.ModelSerializer):
    responsavel_nome = serializers.CharField(source='responsavel.nome', read_only=True)
    escola_nome = serializers.CharField(source='escola.nome', read_only=True)
    idade = serializers.ReadOnlyField()
    
    class Meta:
        model = Filho
        fields = ['id', 'nome', 'data_nascimento', 'idade', 'responsavel', 'responsavel_nome', 'escola', 'escola_nome',]