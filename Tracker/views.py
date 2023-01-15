from django.shortcuts import render
from Tracker.serializers import FriendSerializer,TransactionSerializer,FriendGroupSerializer,UserSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Transaction,FriendRecord,UserDetails,Friend_group
from  django.contrib.auth.models import User
from rest_framework.response import Response
from django.views import View
from django.forms.models import model_to_dict
from django.contrib import messages
from .forms import UserRegistrationForm,UserProfileForm
import sys

# Views for getting the user record
@api_view(['GET'])
def User_rec(request):
    User_details=UserDetails.objects.filter(user=request.user)
    serializer=UserSerializer(User_details,many=True)
    return Response(serializer.data)


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
        

# view for getting the list of tranactions
@api_view(['GET'])
def transaction_list(request):
    transactions=Transaction.objects.filter(user=request.user)
    serializer=TransactionSerializer(transactions,many=True)
    return Response(serializer.data)

# Getting the list of friend with particular transaction id
@api_view(['GET'])
def friend_group_list(request,pk):
    friend_group_l=Friend_group.objects.filter(trans_id=pk)
    serializer=FriendGroupSerializer(friend_group_l,many=True)
    return Response(serializer.data)

# Deleting the list of friend with particular transaction id
@api_view(['DELETE'])
def friend_group_delete(request,pk):
    friend_group_l=Friend_group.objects.filter(id=pk)
    friend_group_l.delete()
    return Response("Item deleted")

# Getting the list of all friends of login user
@api_view(['GET'])
def friends_list(request):
    friends=FriendRecord.objects.filter(user=request.user)
    serializer=FriendSerializer(friends,many=True)
    return Response(serializer.data)

# getting the list of data of transaction wih particular id
@api_view(['GET'])
def Transaction_group(request,pk):
    Friend_group_list=Friend_group.objects.filter(trans_id=pk)
    serializer=FriendGroupSerializer(Friend_group_list,many=True)
    return Response(serializer.data)

# Creating the new friend
@api_view(['POST'])
def Create_friend(request):
    serializer=FriendSerializer(data=request.data)
    User_name=UserDetails.objects.get(user=request.user)
    request.data['user']= model_to_dict(User_name)['id']
    if serializer.is_valid():
        serializer.save()
    print(serializer.data)
    return Response(serializer.data)

# Creatng the friend group
@api_view(['POST'])
def Create_friend_group(request):
    User_name=UserDetails.objects.get(user=request.user)
    request.data['user']= model_to_dict(User_name)['id']
    serializer=FriendGroupSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
    print(serializer.data)
    return Response(serializer.data)

# Creating the new tranaction
@api_view(['POST'])
def Create_Transaction(request):
    total_friend=[p for p in FriendRecord.objects.all() if p.user==request.user]
    amount_spend=int(request.data['amount'])
    for fri in total_friend:
        name=fri.name
        id=request.data['trans_id']
        usr=request.user
        print(name)
        print(usr)
        reg=Friend_group(user=usr,trans_id=id,name=name)
        reg.save()
    User_name=UserDetails.objects.get(user=request.user)
    request.data['user']= model_to_dict(User_name)['id']
    bud=model_to_dict(User_name)['budget']
    exp=model_to_dict(User_name)['amountspend']
    request.data['amount']=round((amount_spend/(len(total_friend)+1)))
    exp=exp+request.data['amount']
    bud=bud-request.data['amount']
    UserDetails.objects.filter(user=request.user).update(budget=round(bud),amountspend=round(exp))
    print(request.data)
    serializer=TransactionSerializer(data=request.data)
    # print(serializer)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

# Updaing the transaction
@api_view(['POST'])
def Update_Transaction(request,pk):
    transaction=Transaction.objects.get(trans_id=pk)
    # First get the amount initial
    # Update amount by user
    # Add the amount initial to original amount
    # Delete the update amount
    
    # 10000 343
    # 2000  
    # 2000 1000
    User_name=UserDetails.objects.get(user=request.user)
    
    request.data['user']= model_to_dict(User_name)['id']
    
    initialamount=model_to_dict(User_name)['budget']
    initialexp=model_to_dict(User_name)['amountspend']
    print(initialamount)
    print(initialexp)
    newamount=(request.data['amount'])
    print(newamount)
    
    Updated_people=[p for p in Friend_group.objects.all() if p.trans_id==pk]
    updated_cost=round(int(newamount)/(len(Updated_people)+1))
    print(updated_cost)
    
    prev_exp=Transaction.objects.get(trans_id=pk)
    prev_exp_val=model_to_dict(prev_exp)['amount']
    print(prev_exp_val)
    
    final_cost_diff=updated_cost-prev_exp_val
    updated_budget=initialamount-final_cost_diff
    initialexp=initialexp+final_cost_diff
    print(final_cost_diff)
    print(updated_budget)
    
    UserDetails.objects.filter(user=request.user).update(budget=updated_budget,amountspend=initialexp)
    request.data['amount']=round(updated_cost)
    print(request.data)
    serializer=TransactionSerializer(instance=transaction,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def Delete_Transaction(request,pk):
    transaction=Transaction.objects.get(trans_id=pk)
    transaction.delete()
    return Response("Item deleted")


@api_view(['DELETE'])
def Delete_Friend(request,pk):
    friend_d=FriendRecord.objects.get(id=pk)
    friend_d.delete()
    return Response("Item deleted")

# User profile view
def profile(request):
    add=FriendRecord.objects.filter(user=request.user)
    return render(request,'app/profile.html',{'add':add,'active':'btn-primary'})



class ProfileView(View):
    def get(self,request):
        form=UserProfileForm()
        return render(request,'app/profile.html',{'form':form,'active':'btn-primary'})
    
    def post(self,request):
        form=UserProfileForm(request.POST)   
        # print(sys.getsizeof(temp))
        if(form.is_valid()):
            usr=request.user
            name=form.cleaned_data['name']
            email_id=form.cleaned_data['email_id']
            mobile_num=form.cleaned_data['mobile_num']
            budget=form.cleaned_data['budget']
            amountspend=form.cleaned_data['amountspend']
            try:
                check = UserDetails.objects.get(user=request.user)
                UserDetails.objects.filter(user=request.user).update(name=name,email_id=email_id,mobile_num=mobile_num,budget=budget,amountspend=amountspend)
                messages.success(request,'Congratulation !! Profile Updated Successfully')
            except UserDetails.DoesNotExist:
                print("hlls")
                reg=UserDetails(user=usr,name=name,email_id=email_id,mobile_num=mobile_num,budget=budget,amountspend=amountspend)
                reg.save()
                messages.success(request,'Congratulation !! Profile Created Successfully')
                    
        return render(request,'app/profile.html',{'form':form,'active':'btn-primary'})