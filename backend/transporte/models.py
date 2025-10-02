from django.db import models
# IMPORTS INTERNOS MODELS
from usuarios.models import Usuario
from filhos.models import Filho

class Veiculo(models.Model):
    placa = models.CharField(max_length=10)
    modelo = models.CharField(max_length=50)
    ano = models.PositiveIntegerField()
    capacidade = models.PositiveIntegerField()
    motorista = models.ForeignKey(Usuario, on_delete=models.CASCADE, limit_choices_to={'tipo': 'motorista'})

    def __str__(self):
        return f"{self.modelo} - {self.placa}"
    
class Rota(models.Model):
    nome = models.CharField(max_length=100)
    veiculo = models.ForeignKey(Veiculo, on_delete=models.CASCADE)
    alunos = models.ManyToManyField(Filho, related_name="rotas")
    
    def __str__(self):
        return self.nome