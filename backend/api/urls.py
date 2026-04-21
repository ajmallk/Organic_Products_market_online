from django.urls import path
from .views import RegisterView, ProductListCreateView, ProductDetailView, ContactMessageCreateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('products/', ProductListCreateView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),

    # Contact form endpoint — stores message in SQLite, no auth required
    path('contact/', ContactMessageCreateView.as_view(), name='contact'),
]
