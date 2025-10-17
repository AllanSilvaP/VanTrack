from django.urls import path
from .views import FilhoListCreateView, FilhoDetailView
urlpatterns = [
    path('', FilhoListCreateView.as_view(), name='filho-list-create'),
    path('<int:pk>/', FilhoDetailView.as_view(), name='filho-detail')
]