from django.db import models

# Create your models here.
from django.db import models
from  django.contrib.auth.models import User
# Create your models here.
STATE_CHOICES = (
   ("Andaman and Nicobar Islands","Andaman and Nicobar Islands"),
   ("Andhra Pradesh","Andhra Pradesh"),
   ("Arunachal Pradesh","Arunachal Pradesh"),
   ("Assam","Assam"),
   ("Bihar","Bihar"),
   ("CG","Chhattisgarh"),
   ("CH","Chandigarh"),
   ("DN","Dadra and Nagar Haveli"),
   ("DD","Daman and Diu"),
   ("DL","Delhi"),
   ("GA","Goa"),
   ("GJ","Gujarat"),
   ("HR","Haryana"),
   ("HP","Himachal Pradesh"),
   ("JK","Jammu and Kashmir"),
   ("JH","Jharkhand"),
   ("KA","Karnataka"),
   ("KL","Kerala"),
   ("LA","Ladakh"),
   ("LD","Lakshadweep"),
   ("MP","Madhya Pradesh"),
   ("MH","Maharashtra"),
   ("MN","Manipur"),
   ("ML","Meghalaya"),
   ("MZ","Mizoram"),
   ("NL","Nagaland"),
   ("OD","Odisha"),
   ("PB","Punjab"),
   ("PY","Pondicherry"),
   ("RJ","Rajasthan"),
   ("SK","Sikkim"),
   ("TN","Tamil Nadu"),
   ("TS","Telangana"),
   ("TR","Tripura"),
   ("UP","Uttar Pradesh"),
   ("UK","Uttarakhand"),
   ("WB","West Bengal")
)

CATEGORY = (
    ("Food","Food"),
    ("Shopping","Shopping"),
    ("Rent","Rent"),
    ("Travel","Travel"),
    ("Other","Other")
    
)
# Creating Here Friends model
class UserDetails(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,default="") 
    name=models.CharField(max_length=200)
    email_id=models.EmailField()
    mobile_num=models.IntegerField()
    budget=models.FloatField()
    amountspend=models.FloatField()
    def __str__(self):
      return str(self.id)
    
class FriendRecord(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,default="") 
    name=models.CharField(max_length=200)
    email_id=models.EmailField()
    state=models.CharField(choices=STATE_CHOICES,max_length=50)
    address=models.CharField(max_length=500)
    mobile_num=models.IntegerField()
    
    def __str__(self):
      return str(self.id)
    
class Transaction(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    friend=models.ForeignKey(FriendRecord,on_delete=models.CASCADE)
    amount=models.FloatField()
    date=models.DateTimeField(auto_now=True)
    category=models.CharField(choices=CATEGORY,max_length=50)    
    def __str__(self):
        return str(self.id)