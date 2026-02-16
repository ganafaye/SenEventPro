from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    # On trie les événements par date la plus proche
    queryset = Event.objects.all().order_by('date')
    serializer_class = EventSerializer