from django.db import models
# classes de fora
from usuarios.models import Usuario
from escolas.models import Escola

class Filho(models.Model):
    nome = models.CharField(max_length=100)
    data_nascimento = models.DateField()
    responsavel = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='filhos')
    escola = models.ForeignKey(Escola, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self): 
        return self.nome
    
    @property
    def idade(self):
        from datetime import date
        hoje = date.today()
        
        idade = hoje.year - self.data_nascimento.year
        
        if (hoje.month, hoje.day) < (self.data_nascimento.month, self.data_nascimento.day):
            idade -= 1
            
        return idade