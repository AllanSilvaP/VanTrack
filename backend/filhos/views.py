from rest_framework import generics, permissions
from .models import Filho
from .serializers import FilhoSerializer

class FilhoListCreateView(generics.ListCreateAPIView):
    queryset = Filho.objects.all()
    serializer_class = FilhoSerializer
    
    def get_queryset(self):
        user = self.request.user
        
        if user.tipo == "responsavel":
            return Filho.objects.filter(responsavel=user)
        return Filho.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(responsavel=self.request.user)

class FilhoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Filho.objects.all()
    serializer_class=FilhoSerializer