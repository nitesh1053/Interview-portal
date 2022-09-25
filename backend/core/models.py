from datetime import datetime
from django.db import models

class Participant(models.Model):
    mail = models.EmailField()
    name = models.CharField(max_length = 50)

    class Meta:
        db_table = "Participant"

    def __str__(self):
        return self.name

class Interview(models.Model):
    name = models.CharField(max_length = 50)
    participants = models.ManyToManyField(Participant)
    start_time = models.DateTimeField(default=datetime.now, blank=True)
    end_time = models.DateTimeField(default=datetime.now, blank=True)

    class Meta:
        db_table = "Interview"
    
    def __str__(self):
        return self.name