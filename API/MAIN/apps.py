from django.apps import AppConfig


class MainConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'MAIN'

    # def ready(self) -> None:
        # from . import models
        # recint = models.Recinto.objects.create(name="SDQ")
        # print(recint)
        # dep = models.Departamento.objects.create(name="Root", recinto=recint)
        # print(dep.id)
