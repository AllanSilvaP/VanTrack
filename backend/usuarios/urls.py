from django.urls import path
from .views import RegistrarUsuarioView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('registrar/', RegistrarUsuarioView.as_view(), name='registrar'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]