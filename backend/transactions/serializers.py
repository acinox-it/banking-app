from rest_framework import serializers
from .models import BankAccount, Transaction

class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = ['id', 'account_number', 'account_type', 'balance', 'user']
    def create(self, validated_data):
            # Ensure the owner is the requesting user
            validated_data['owner'] = self.context['request'].user
            return super().create(validated_data)
        
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'bank_account', 'transaction_type', 'amount', 'timestamp', 'description']