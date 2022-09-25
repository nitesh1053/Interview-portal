from django.urls import path
from .views import *

urlpatterns = [
    path('search/', search),
    path('edit-interview/<int:id>', editInterviews),
    path('add-interview/', addInterviews),
    path('add-participant/', addParticipants),
    path('get-participant/', getParticipants),
    path('get-interviews/', getInterviews),
    # path('send/<int:id>', send),
]
