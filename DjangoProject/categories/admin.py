from django.contrib import admin

# Register your models here.
from django.contrib import admin

# Importations absolues depuis chaque application
from users.models import User
from categories.models import Category
from locations.models import Location
from events.models import Event

# Enregistrement
admin.site.register(User)
admin.site.register(Category)
admin.site.register(Location)
admin.site.register(Event)