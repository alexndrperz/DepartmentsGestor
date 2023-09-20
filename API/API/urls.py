from django.contrib import admin
from django.urls import path, include
from MAIN import views
from rest_framework.routers import DefaultRouter

RecintoRouter = DefaultRouter()
RecintoRouter.register(r'', views.RecintoView)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('recinto/',include(RecintoRouter.urls) ),
    path('login',views.AuthView.as_view({'post':'post_authenticate'})),
]