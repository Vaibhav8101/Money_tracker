from rest_framework import serializers
from Tracker.models import FriendRecord,Transaction


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model=FriendRecord
        fields=('id','user','name','email_id','state','address','mobile_num')
        
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Transaction
        fields=('id','user','friend','amount','date','category')        