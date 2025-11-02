from django.shortcuts import render, HttpResponse
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserSerializer
from .permissions import IsAdminUser
from rest_framework.permissions import IsAuthenticated

# Testing view
def testing_view(request):
    return HttpResponse("Accounts app is working!")
# User viewset
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]