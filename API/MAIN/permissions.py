from rest_framework import permissions

class ProductPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        print(22)
        auth_actions= ['get_almacen','get_products_enc']
        
        if view.action in auth_actions and not request.user.is_authenticated:
            return False
        else:

            return True