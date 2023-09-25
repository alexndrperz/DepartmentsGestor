from django.db import models

from django.db import models
from .utils import Services

from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager,
    PermissionsMixin
)


def generate_path_file(instance, filename):
    filename = Services.generate_code()

    if type(instance).__name__ == 'Producto':
        return f'images/products/{instance.almacen.name}/{filename}.jpg'

class Recinto(models.Model):
    name = models.CharField( max_length=50)

class UserManager(BaseUserManager):
    def create_user(self, name, password=None, **extra_fields):
        if not name:
            raise ValueError(('El nombre de usuario debe estar configurado'))
        user = self.model(name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(name, password, **extra_fields)




class Departamento(models.Model):
    def generate_token():
        return Services.crear_token()
    name = models.CharField( max_length=50)
    recinto = models.ForeignKey(Recinto, on_delete=models.CASCADE)
    token = models.CharField(max_length=50, default=generate_token)

class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=254, unique=True)
    is_staff = models.BooleanField(default=False)
    department = models.ForeignKey(Departamento, on_delete=models.CASCADE,default=1)
    USERNAME_FIELD = 'name'
    objects = UserManager()

class Almacen(models.Model):
    name = models.CharField(max_length=50)
    recinto = models.OneToOneField(Recinto, on_delete=models.CASCADE, related_name='almacen')
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='almacen')

class Producto(models.Model):
    image = models.ImageField(upload_to=generate_path_file, null=True, max_length=None)
    model = models.CharField(max_length=50)
    delivered_estimated = models.IntegerField()
    name = models.CharField( max_length=50)
    quantity_available = models.IntegerField()
    almacen= models.ForeignKey(Almacen, on_delete=models.CASCADE)

class Encargado(models.Model):
    fullName = models.CharField( max_length=50)
    email = models.EmailField( max_length=254)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)

class Empleado(models.Model):
    fullName = models.CharField(max_length=50)
    email = models.EmailField( max_length=254)
    cargo = models.CharField(max_length=50)
    encargado = models.ForeignKey(Encargado, on_delete=models.CASCADE)

class Solicitudes(models.Model):
    department = models.ForeignKey(Departamento, on_delete=models.CASCADE )
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    quantity_asked = models.IntegerField()
    status = models.CharField(max_length=50, choices=(
            ("En proceso","En proceso"),
            ("Aprobada","Aprobada"),
            ("Rechazada","Rechazada"),
        ))
