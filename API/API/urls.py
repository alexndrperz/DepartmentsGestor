from django.contrib import admin
from django.urls import path, include
from MAIN import views
from rest_framework.routers import DefaultRouter

RecintoRouter = DefaultRouter()
RecintoRouter.register(r'', views.RecintoView)

SolicitudesRouter = DefaultRouter()
SolicitudesRouter.register(r'', views.SolicitudesView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('recinto/',include(RecintoRouter.urls) ),
    path('login',views.AuthView.as_view({'post':'post_authenticate'})),
    path('departamento/<str:token>', views.DepartmentView.as_view({'get':'get_item_token_based'})),
    path('solicitudes/', include(SolicitudesRouter.urls))
]