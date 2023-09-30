from django.shortcuts import get_object_or_404
import os
from rest_framework import viewsets, exceptions, response
from . import models, serializers, permissions,utils
from django.http import JsonResponse, FileResponse
from django.conf import settings
import datetime, jwt
from django.core.paginator import Paginator

class RecintoView(viewsets.ModelViewSet):
    queryset = models.Recinto.objects.all()
    serializer_class = serializers.RecintoSerializer



class ProductView(viewsets.ModelViewSet):
    queryset = models.Producto.objects.all()
    permission_classes = [permissions.ProductPermission]
    
    def get_product_token_based(self, request):
        return JsonResponse({})
    
    def get_product_image(self, request, id):
        product = get_object_or_404(models.Producto, id=id)
        road_img= os.path.join(settings.BASE_DIR,product.image.path)
        print(road_img)
        if os.path.exists(road_img):
            return FileResponse(open(road_img,'rb'),content_type='image/jpeg')
        else:
            return JsonResponse({'msg':'La imagen no existe'}, status=404)

    def create_almacen_product(self, request):
        almacen = request.user.almacen
        serializer = serializers.ProductoSerializer(data=request.data, context={'almacen':almacen})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse({}, status=201)
    

    def update_almacen_product(self, request, id):
        product= get_object_or_404(models.Producto, id=id)
        serializer = serializers.ProductoSerializer(instance=product, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse({'msg':'Updated'})
        
    def get_almacen(self, request):
        almacen  = request.user.almacen
        products = models.Producto.objects.filter(almacen=almacen)
        serializer = serializers.ProductoSerializer(products, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    def get_products_enc(self, request):
        almacen= request.user.department.recinto.almacen
        products = models.Producto.objects.filter(almacen=almacen)
        serializer= serializers.ProductoSerializer(products, many=True)
        return JsonResponse(serializer.data, safe=False) 

    def get_product_token_based(self, request,token):
        print(2222)
        department = models.Departamento.objects.get(token=token)
        department = get_object_or_404(models.Departamento, token=token)
        almacen = department.recinto.almacen
        products = models.Producto.objects.filter(almacen=almacen)
        serializer = serializers.ProductoSerializer(products, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    
class DepartmentView(viewsets.ModelViewSet):
    queryset = models.Departamento.objects.all()

    def get_item_token_based(self,request,token):
        try:
            obj = models.Departamento.objects.get(token=token)
            return JsonResponse({'department_id':obj.id, 'name':obj.name, 'recinto':obj.recinto.name,'token':obj.token})
        except Exception as e:
            print(e)
            return JsonResponse({'msg':'No existe'}, status=404)

    def getLink(self, request,id):
        depart = get_object_or_404(models.Departamento,  id=id)
        return JsonResponse({'route':f"http://localhost:4200/solicitudes/{depart.token}"})
    
class SolicitudesView(viewsets.ModelViewSet):
    queryset = models.Solicitudes.objects.all()
    serializer_class = serializers.SolicitudesSerializer


    def list(self, request):
        if request.user.almacen:
            solicitudes =  models.Solicitudes.objects.filter(department__recinto__almacen=request.user.almacen).order_by('createdAt')
            pagin = Paginator(solicitudes,10)
        page_num = int(request.GET.get('page', 1))
        page = pagin.get_page(page_num)

        serializer = serializers.SolicitudesSerializer(page, many=True)
        
        return JsonResponse({'data':serializer.data, 'items':solicitudes.count(), 'page_index':page.number}, safe=False)
    
    def get_solics_department_xslx(self, request, dep_id):
        depart = get_object_or_404(models.Departamento, id=dep_id)
        solicitudes = models.Solicitudes.objects.filter(department=depart)
        serializer = serializers.SolicitudesSerializer(solicitudes, many=True)
        response = utils.Services.generate_xlsx(serializer.data)
        return response

    def get_department_solics(self, request):
        own = request.GET.get('own', None)
        department = request.user.department
        if own:
            solicitudes = models.Solicitudes.objects.filter(name=request.user.name).order_by('createdAt')
        else:
            solicitudes = models.Solicitudes.objects.filter(department=department).order_by('createdAt')
        serializer = serializers.SolicitudesSerializer(solicitudes, many=True)
        
        return JsonResponse(serializer.data, safe=False)

    def update(self, request, pk):
        solicitud = get_object_or_404(models.Solicitudes, id=pk)
        option = request.data.get('option',None)
        if option:
            if solicitud.status== "En proceso":
                if option ==1:
                    solicitud.status = 'Rechazada'
                elif option == 2:
                    solicitud.status = 'Aprobada'
                else:

                    return JsonResponse({'msg':'Opcion invalida'}, status=400)
            elif solicitud.status== "Aprobada" and option==2:
                solicitud.status= "Entregada"
                solicitud.producto.quantity_available -= solicitud.quantity_asked

            else:
                print(type(option), option)
                return JsonResponse({'msg':'Opcion invalida'}, status=400)
        else:
            print(option)
            return JsonResponse({'msg':'fomato de request incorrecto'}, status=400)
        solicitud.save()
        solicitud.producto.save()
        ser = serializers.SolicitudesSerializer(solicitud)
        return JsonResponse(ser.data, status=201)

    def destroy(self, request, *args, **kwargs):
        return JsonResponse({'msg':'not allowed'}, status=405)
    
class AuthView(viewsets.ModelViewSet):

    def post_authenticate(self,request):
        username = request.data.get('username',None)
        password = request.data.get('password',None)

        user = models.User.objects.filter(name=username).first()
        if user is None:
            raise exceptions.AuthenticationFailed("El usuario no existe")
        
        if not user.check_password(password):
            raise exceptions.NotAuthenticated("Contraseña Incorrecta")
        
        payload = {
            'id':user.id,
            'role':list(user.groups.values_list('name')),
            'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=80),
            'iat':datetime.datetime.utcnow()
        }

        token = jwt.encode(payload,'secret',algorithm='HS256').decode('utf-8')
        res = response.Response()
        res.set_cookie(key='jwt', value=token, httponly=True, secure=True,samesite='None')
        res.data = {
            'token':token
        }
        return res
    


class AlmacenView(viewsets.ModelViewSet):
    queryset = models.Almacen.objects.all()
    serializer_class = serializers.AlmacenSerializer

