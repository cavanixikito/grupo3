from django.urls import path
from .views import BomberosPageView,maquinaria_list,prestamos_area,agregar_maquinaria,agregar_prestamo

urlpatterns=[
    path("bomberos/",BomberosPageView.as_view(),name="bomberos"),
    path('maquinaria/', maquinaria_list, name='maquinaria-list'),
    path('prestamos/', prestamos_area, name='prestamos_area'),
    path('agregar/', agregar_maquinaria, name='agregar_maquinaria'),
    path('agregar_prestamo/', agregar_prestamo, name='agregar_prestamo'),
  
]