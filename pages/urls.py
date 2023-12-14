from django.urls import path
from .views import InicioPageView, QuienesPageView, FormsPageView, RegistroPageView, Inicio2PageView,InventarioPageView, Inventario2PageView,registro_usuario
urlpatterns = [
    path("inicio/", InicioPageView.as_view(), name = "inicio"),
    path("quienes/", QuienesPageView.as_view(), name = "quienes"), 
    path("forms/", FormsPageView.as_view(), name = "forms"), 
    path("registro2/", RegistroPageView.as_view(), name = "registro"),
    path("", Inicio2PageView.as_view(), name = "inicio2"),  
    path("inventario/", InventarioPageView.as_view(), name = "inventario"),
    path("inventario2/", Inventario2PageView.as_view(), name = "inventario2"),     
    path("registro/", registro_usuario, name="registro_usuario"), 
    
    
]
