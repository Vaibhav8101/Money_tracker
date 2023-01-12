from django.shortcuts import render
from Tracker.serializers import FriendSerializer,TransactionSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Transaction,FriendRecord,UserDetails
from  django.contrib.auth.models import User
from rest_framework.response import Response
from django.views import View
from django.contrib import messages
from .forms import UserRegistrationForm,UserProfileForm

class UserRegistrationView(View):
    def get(self,request):
        form=UserRegistrationForm()
        return render(request,'app/userregistration.html',{'form':form})
    
    def post(self,request):
        form=UserRegistrationForm(request.POST)
        if form.is_valid():
            messages.success(request,'Congratulations !! You are Registered Successfully')
            form.save()
        return render(request,'app/userregistration.html',{'form':form})
        

@api_view(['GET'])
def transaction_list(request):
    transactions=Transaction.objects.filter(user=request.user)
    serializer=TransactionSerializer(transactions,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def friends_list(request):
    print("*******")
    print(request.user)
    friends=FriendRecord.objects.filter(user=request.user)
    serializer=FriendSerializer(friends,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def Create_friend(request):
    serializer=FriendSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def Create_Transaction(request):
    # print(request.data)
    total_friend=[p for p in FriendRecord.objects.all() if p.user==request.user]
    amount=request.data['amount']
    # The cost is divided among the friends
    request.data['amount']=(amount/len(total_friend))
    serializer=TransactionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    # print(amount/len(total_friend))
    
    return Response(serializer.data)

@api_view(['POST'])
def Update_Transaction(request,pk):
    transaction=Transaction.objects.get(id=pk)
    print(pk)
    print(transaction)
    serializer=TransactionSerializer(instance=transaction,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def Delete_Transaction(request,pk):
    transaction=Transaction.objects.get(id=pk)
    transaction.delete()
    return Response("Item deleted")


def profile(request):
    add=FriendRecord.objects.filter(user=request.user)
    return render(request,'app/profile.html',{'add':add,'active':'btn-primary'})

class ProfileView(View):
    def get(self,request):
        form=UserProfileForm()
        return render(request,'app/profile.html',{'form':form,'active':'btn-primary'})
    
    def post(self,request):
        form=UserProfileForm(request.POST)
        if(form.is_valid()):
            usr=request.user
            name=form.cleaned_data['name']
            email_id=form.cleaned_data['email_id']
            mobile_num=form.cleaned_data['mobile_num']
            budget=form.cleaned_data['budget']
            amountspend=form.cleaned_data['amountspend']
            reg=UserDetails(user=usr,name=name,email_id=email_id,mobile_num=mobile_num,budget=budget,amountspend=amountspend)
            reg.save()
            messages.success(request,'Congratulation !! Profile Updated Successfully')
        return render(request,'app/profile.html',{'form':form,'active':'btn-primary'})