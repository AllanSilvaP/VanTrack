from rest_framework import viewsets, permissions
from .models import Escola
from .serializers import EscolaSerializers

class EscolaViewSet(viewsets.ModelViewSet):
    """
    ViewSet que fornece automaticamente:
    - list: GET /api/escolas/
    - retrieve: GET /api/escolas/{id}/
    - create: POST /api/escolas/ (apenas admin)
    - update: PUT/PATCH /api/escolas/{id}/ (apenas admin)
    - destroy: DELETE /api/escolas/{id}/ (apenas admin)
    """
    
    queryset = Escola.objects.all()
    serializer_class = EscolaSerializers
    
    def get_permissions(self):
        """
        Usuários autenticados podem listar e ver detalhes.
        Apenas admin pode criar, editar e deletar.
        """
        
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]    