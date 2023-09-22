from rest_framework import serializers
from . import models
from django.contrib.auth.models import Group
from django.http import JsonResponse

class RecintoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Recinto
        fields = '__all__'
 
    def create(self, validated_data):
        recinto =  super().create(validated_data)
        almacen = models.Almacen.objects.create(name=f"Almacen de recinto {validated_data['name']}", recinto=recinto )
        almacen.save()
        return recinto

class DepartamentoSerializer(serializers.ModelSerializer):
    recinto = RecintoSerializer(read_only=True)
    recinto_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = models.Departamento
        fields = '__all__'

    def validate_recinto_id(self, value):
        try:
            recinto= models.Recinto.objects.get(id=value)
            return value
        except Exception as e:
            print(type(e), e)
            return JsonResponse({'msg':'El recinto solicitado no existe'}, status=400)
        
    def create(self, validated_data):
        print(validated_data)
        recinto= models.Recinto.objects.get(id=validated_data['recinto_id'])
        validated_data['name'] = f"{recinto.name}-{validated_data['name']}"
        print(validated_data)
        department = models.Departamento.objects.create(**validated_data)
        return department

class UserAdminRetrieveCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    last_login= serializers.DateTimeField(read_only=True)
    role = serializers.CharField(write_only=True)
    roles = serializers.SerializerMethodField()
    department_id = serializers.IntegerField(write_only=True)
    department = DepartamentoSerializer(read_only=True)

    def validate_role(self, value):
        try:
            group= Group.objects.get(name=value)
            return group
        except Exception as e:
            print(type(e), e)
            return JsonResponse({'msg':'El grupo solicitado no existe'}, status=400)
    
    def validate_deparment_id(self, value):
        try:
            depatmnt= models.Departamento.objects.get(name=value)
            return depatmnt
        except Exception as e:
            print(type(e), e)
            return JsonResponse({'msg':'El grupo solicitado no existe'}, status=400)
    
        
    def get_roles(self, instance):
        return list(instance.groups.values_list('name'))

    class Meta:
        model = models.User
        exclude = ['user_permissions','is_staff', 'is_superuser','groups']

    def create(self, validated_data):
        role= validated_data.pop('role')
        password = validated_data.pop('password')
        department = validated_data.pop('department_id',None)
        recinto = department.recinto

        almacen = models.Almacen.objects.get(recinto=recinto)


        user = models.User(**validated_data)
        user.set_password(password)
        
        user.save()
        user.groups.add(role)
        if role =="Almacen":
            almacen.user = user
            almacen.save()
        user.save()
        return user
    
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Producto
        fields = '__all__'

class UserAdminUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=False)
    role = serializers.CharField()

    def validate_role(self, value):
        try:
            group= Group.objects.get(name=value)
            return group
        except Exception as e:
            print(type(e), e)
            return JsonResponse({'msg':'El grupo solicitado no existe'}, status=400)


    class Meta:
        model = models.User
        fields = ('name', 'password', 'role')

    def update(self, instance, validated_data):
        password = validated_data.pop('password',None)
        role = validated_data.pop('role',None)
        if password:
            instance.set_password(password)
        if role:
            instance.groups.set([role])
        return super().update(instance, validated_data)

        
class AlmacenSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Almacen
        fields = '__all__'

class SolicitudesSerializer(serializers.ModelSerializer):
    department = DepartamentoSerializer(read_only=True)
    department_id = serializers.IntegerField(write_only=True)
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.IntegerField(write_only=True)


    class Meta:
        model = models.Solicitudes
        fields = '__all__'