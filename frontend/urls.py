from django.contrib import admin
from django.urls import path,include
from .import views

app_name='frontend'
urlpatterns = [
    path('',views.index),
    path('update_t/<str:id>/',views.index2),
    path('friend-trans-detail/<str:id>/',views.index2)
        
]
