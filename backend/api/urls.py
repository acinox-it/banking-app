from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts.views import UserViewSet
from transactions.views import BankAccountViewSet, TransactionViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Router setup
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'accounts', BankAccountViewSet, basename='bankaccount')
router.register(r'transactions', TransactionViewSet, basename='transaction')



urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]