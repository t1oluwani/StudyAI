from django.urls import path
from . import views

urlpatterns = [
  path('download_mp3/', views.test_func, name='Test Function'),
]
