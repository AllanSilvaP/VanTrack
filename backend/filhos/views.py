from rest_framework import viewsets, permissions
from .models import Filho
from .serializers import FilhoSerializers

class FilhoViewSet(viewsets.ModelViewSet):
    queryset = Filho.objects.all()
    serializer_class = FilhoSerializers
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        if user.tipo == "responsavel":
            return Filho.objects.filter(responsavel=user)
        return Filho.objects.all()
