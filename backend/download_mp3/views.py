from django.shortcuts import render
from django.http import HttpResponse

def test_func(request):
    return HttpResponse("Hello world!")
