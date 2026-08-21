from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model

User = get_user_model()


class RegisterView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        name = request.data.get("name", "").strip()
        email = request.data.get("email", "").strip().lower()
        password = request.data.get("password", "")

        if not name or not email or not password:
            return Response(
                {"message": "Name, email, and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if len(password) < 8:
            return Response(
                {"message": "Password must contain at least 8 characters."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(email__iexact=email).exists():
            return Response(
                {"message": "An account with this email already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        username = email
        first_name, _, last_name = name.partition(" ")
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )

        return Response(
            {"message": "Account created successfully.", "username": user.username},
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    """
    Login API

    POST /api/auth/login/
    """

    permission_classes = [AllowAny]

    def post(self, request):

        username = request.data.get("username", "").strip()
        password = request.data.get("password")

        if not username:
            return Response(
                {
                    "success": False,
                    "message": "Username is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not password:
            return Response(
                {
                    "success": False,
                    "message": "Password is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        account = User.objects.filter(email__iexact=username).first()
        login_username = account.username if account else username

        user = authenticate(
            username=login_username,
            password=password
        )

        if user is None:
            return Response(
                {
                    "success": False,
                    "message": "Invalid username or password."
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "success": True,
                "message": "Login successful.",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            },
            status=status.HTTP_200_OK
        )