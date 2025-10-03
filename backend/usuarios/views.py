from rest_framework import generics
from django.contrib.auth import get_user_model
from .serializers import UsuarioSerializer
from rest_framework.permissions import AllowAny

Usuario = get_user_model()

class RegistrarUsuarioView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]
