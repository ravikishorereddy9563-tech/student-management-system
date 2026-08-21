from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import LoginView, RegisterView


urlpatterns = [

    path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),

    # Custom Login
    path(
        "login/",
        LoginView.as_view(),
        name="login"
    ),

    # Obtain JWT access + refresh tokens
    path(
        "token/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair"
    ),

    # Refresh JWT access token
    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),

]