from rest_framework import serializers
from Tracker.models import FriendRecord,Transaction,Friend_group,UserDetails

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserDetails
        fields=('id','user','name','email_id','mobile_num','budget','amountspend')


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model=FriendRecord
        fields=('id','user','name','email_id','state','address','mobile_num')
        
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Transaction
        fields=('id','user','trans_id','amount','date','category')  

class FriendGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=Friend_group
        fields=('id','user','trans_id','name')           