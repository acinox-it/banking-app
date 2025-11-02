from django.db import models
from django.conf import settings
import uuid

class BankAccount(models.Model):
    ACCOUNT_TYPES = [ ('current', 'Courant'), ('savings', 'Épargne') ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    account_type = models.CharField(max_length=10, choices=ACCOUNT_TYPES, default='current')
    account_number = models.CharField(max_length=20, unique=True)
    
    def save(self, *args, **kwargs):
        if not self.account_number:
            self.account_number = str(uuid.uuid4().int)[:20] # Generate a unique 20-digit account number
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.user.username} - {self.account_type} - {self.account_number}"

class Transaction(models.Model):
    TRANSACTION_TYPES = [ ('deposit', 'Dépôt'), ('withdrawal', 'Retrait'), ('transfer', 'Virement') ]
    
    bank_account = models.ForeignKey(BankAccount, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)
    
    def save(self, *args, **kwargs):
        if self.amount <= 0:
            raise ValueError("Transaction amount must be positive.")
        # Update bank account balance based on transaction type
        if self.transaction_type == 'deposit':
            self.bank_account.balance += self.amount
        elif self.transaction_type == 'withdrawal':
            self.bank_account.balance -= self.amount
        elif self.transaction_type == 'transfer':
            # For simplicity, assume transfer is treated as a withdrawal here
            self.bank_account.balance -= self.amount
        
        self.bank_account.save()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.transaction_type} of {self.amount} on {self.bank_account.account_number} at {self.timestamp}"