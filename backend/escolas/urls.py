from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EscolaViewSet

router = DefaultRouter()
router.register(r'', EscolaViewSet, basename='escola')

urlpatterns = [
    path('', include(router.urls))
]