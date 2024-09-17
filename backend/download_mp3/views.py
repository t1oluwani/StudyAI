from django.http import HttpResponse
from django.shortcuts import render

def file_drop(request):
      return render(request, 'file_drop.html')

      

