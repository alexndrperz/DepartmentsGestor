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
    path('department/token/<int:id>', views.DepartmentView.as_view({'get':'getLink'})),
    path('login',jwt_views.TokenObtainPairView().as_view()),
    path('departamento/<str:token>', views.DepartmentView.as_view({'get':'get_item_token_based'})),
    path('recinto/departamento/fsearch', views.DepartmentView.as_view({'get':'get_departments_for_search'})),
    path('products/almacen', views.ProductView.as_view({'get':'get_almacen','post':'create_almacen_product'})),
    path('products/almacen/fsearch', views.ProductView.as_view({'get':'get_products_for_search'})),
    path('products/<str:token>', views.ProductView.as_view({'get':'get_product_token_based',})),
    path('products/almacen/<int:id>', views.ProductView.as_view({'put':'update_almacen_product'})),
    path('products/imagen/<int:id>', views.ProductView.as_view({'get':'get_product_image'})),
    path('encargado/products', views.ProductView.as_view({'get':'get_products_enc'})),
    path('solicitudes/', include(SolicitudesRouter.urls)),
    path('search/solicitudes', views.SolicitudesView.as_view({'get':'search_solict'})),
    path('report/solicitudes/almacen', views.SolicitudesView.as_view({'post':'create_report_alm'})),
    path('solicitudes/department', views.SolicitudesView.as_view({'get':'get_department_solics'})),
  
]