from django.db import models
from django.core.exceptions import ValidationError
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

# Transaction model
class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('deposit', 'Dépôt'),
        ('withdrawal', 'Retrait'),
        ('transfer', 'Virement'),
    ]

    bank_account = models.ForeignKey(
        'BankAccount',
        on_delete=models.CASCADE,
        related_name='transactions'
    )
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    destinnation_account_number = models.CharField(max_length=20, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)

    def clean(self):
        if self.amount <= 0:
            raise ValidationError("Le montant doit être strictement positif.")

        if self.transaction_type in ['withdrawal', 'transfer']:
            if self.bank_account.balance < self.amount:
                raise ValidationError("Fonds insuffisants pour cette opération.")

    def save(self, *args, **kwargs):
        self.full_clean()  # Appelle clean() pour valider avant sauvegarde

        if self.transaction_type == 'deposit':
            self.bank_account.balance += self.amount
        elif self.transaction_type in ['withdrawal', 'transfer']:
            self.bank_account.balance -= self.amount

        self.bank_account.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.transaction_type} de {self.amount}€ sur {self.bank_account.account_number} à {self.destinnation_account_number} le {self.timestamp.strftime('%d/%m/%Y %H:%M')}"