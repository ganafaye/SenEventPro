from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings
from categories.models import Category
from locations.models import Location


class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    image = models.ImageField(upload_to='events/', blank=True, null=True)

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='events'
    )

    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name='events'
    )

    organizer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='events'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
