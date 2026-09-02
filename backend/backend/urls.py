from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include


def home(request):
    return JsonResponse({
        "status": "success",
        "message": "Organic Products API is running"
    })


urlpatterns = [
    path("", home, name="home"),
    path("admin/", admin.site.urls),

    # Your API
    path("api/", include("api.urls")),
]
