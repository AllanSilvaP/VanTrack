from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    TIPOS = (
        ('responsavel', 'Responsável'),
        ('aluno', 'Aluno'),
        ('motorista', 'Motorista'),
        ('admin', 'Administrador'),
    )
    tipo = models.CharField(max_length=20, choices=TIPOS, default='responsavel')

def __str__(self):
        return self.username