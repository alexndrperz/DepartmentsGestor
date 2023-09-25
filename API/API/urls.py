from django.contrib import admin
from django.urls import path, include
from MAIN import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

RecintoRouter = DefaultRouter()
RecintoRouter.register(r'', views.RecintoView)

SolicitudesRouter = DefaultRouter()
SolicitudesRouter.register(r'', views.SolicitudesView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('recinto/',include(RecintoRouter.urls) ),
    path('login',jwt_views.TokenObtainPairView().as_view()),
    path('departamento/<str:token>', views.DepartmentView.as_view({'get':'get_item_token_based'})),
    path('products/almacen', views.ProductView.as_view({'get':'get_almacen','post':'create_almacen_product'})),
    path('products/<str:token>', views.ProductView.as_view({'get':'get_product_token_based',})),
    path('products/almacen/<int:id>', views.ProductView.as_view({'put':'update_almacen_product'})),
    path('products/imagen/<int:id>', views.ProductView.as_view({'get':'get_product_image'})),
    path('solicitudes/', include(SolicitudesRouter.urls))
]