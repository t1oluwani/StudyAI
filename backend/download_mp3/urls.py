from django.urls import path
from . import views

urlpatterns = [
  path('download_mp3/', views.file_drop, name='File Drop'),
]
