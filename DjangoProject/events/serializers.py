from rest_framework import serializers
from .models import Event
from locations.serializers import LocationSerializer
from categories.serializers import CategorySerializer
from users.serializers import UserSerializer

class EventSerializer(serializers.ModelSerializer):
    # On lie les détails aux bons noms de champs du modèle (source)
    location_details = LocationSerializer(source='location', read_only=True)
    category_details = CategorySerializer(source='category', read_only=True)
    # Ici, la source est 'organizer' car c'est le nom dans ton modèle
    organizer_details = UserSerializer(source='organizer', read_only=True)

    class Meta:
        model = Event
        fields = [
            'id',
            'title',        # C'était 'titre'
            'description',
            'date',
            'price',        # C'était 'prix'
            'image',
            'category',
            'category_details',
            'location',
            'location_details',
            'organizer',    # C'était 'producteur'
            'organizer_details'
        ]