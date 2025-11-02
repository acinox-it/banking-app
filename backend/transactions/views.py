from django.shortcuts import render, HttpResponse
from rest_framework.viewsets import ModelViewSet
from .models import BankAccount, Transaction
from .serializers import BankAccountSerializer, TransactionSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.
def testing_view(request):
    return HttpResponse("Transactions app is working!")

#  BankAccount viewset
class BankAccountViewSet(ModelViewSet):
    serializer_class = BankAccountSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        # Return only bank accounts owned by the requesting user
        return BankAccount.objects.filter(user=self.request.user)

    
# Transaction viewset
class TransactionViewSet(ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        # Return only transactions for bank accounts owned by the requesting user
        return Transaction.objects.filter(bank_account__user=self.request.user)
