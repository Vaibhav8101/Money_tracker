from django.contrib import admin
from django.urls import path,include

# from Tracker.views import FriendViewSet,TransactionViewSet
from rest_framework import routers
from django.contrib.auth import views as auth_views
from .import views
from .forms import LoginForm

router=routers.DefaultRouter()

urlpatterns = [
    path('',include(router.urls)),
    path('transactions/',views.transaction_list,name="transaction"),
    path('friends/',views.friends_list,name="friends"),
    path('friend-create/',views.Create_friend,name="createfriend"),
    path('transaction-create/',views.Create_Transaction,name="createfriend"),
    path('transaction-update/<str:pk>/',views.Update_Transaction,name="update_transaction"),
    path('transaction-delete/<str:pk>/',views.Delete_Transaction,name="delete_transaction"),
    path('registration/',views.UserRegistrationView.as_view(),name="userregistration"),
    path('login/',auth_views.LoginView.as_view(template_name='app/login.html',authentication_form=LoginForm),name='login'),
    path('profile/',views.ProfileView.as_view(),name="profile")
]
