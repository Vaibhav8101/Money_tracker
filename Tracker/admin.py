from django.contrib import admin

# Register your models here.
from .models import (
    FriendRecord,
    Transaction,
    UserDetails
)

@admin.register(UserDetails)
class UserDetailsAdmin(admin.ModelAdmin):
    list_display = ['id','user','name','email_id','mobile_num','budget','amountspend']

@admin.register(FriendRecord)
class FriendModelAdmin(admin.ModelAdmin):
    list_display = ['id','user','name','email_id','state','address','mobile_num']
    

@admin.register(Transaction)
class TransactionModelAdmin(admin.ModelAdmin):
    list_display = ['id','user','friend','amount','date','category']