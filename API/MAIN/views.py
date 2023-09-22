from django.shortcuts import render

from rest_framework import viewsets, exceptions, response
from . import models, serializers
from django.http import JsonResponse
import datetime, jwt

class RecintoView(viewsets.ModelViewSet):
    queryset = models.Recinto.objects.all()
    serializer_class = serializers.RecintoSerializer


class DepartmentView(viewsets.ModelViewSet):
    queryset = models.Departamento.objects.all()

    def get_item_token_based(self,request,token):
        try:
            obj = models.Departamento.objects.get(token=token)
            return JsonResponse({'department_id':obj.id, 'name':obj.name, 'recinto':obj.recinto.name})
        except Exception as e:
            print(e)
            return JsonResponse({'msg':'No existe'}, status=404)

class SolicitudesView(viewsets.ModelViewSet):
    queryset = models.Solicitudes.objects.all()
    serializer_class = serializers.SolicitudesSerializer

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

