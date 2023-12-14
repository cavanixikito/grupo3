from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import render,redirect
from .models import Maquinaria
from .models import AreaSalud, Prestamo
from .forms import MaquinariaForm,PrestamoForm
# Create your views here.

class BomberosPageView(TemplateView):
    template_name="bomberos.html"


def maquinaria_list(request):
    maquinaria_list = Maquinaria.objects.all()
    return render(request, 'listadoInventario.html', {'maquinaria_list': maquinaria_list})

def prestamos_area(request):
    areas_salud = AreaSalud.objects.all()
    prestamos = Prestamo.objects.all()
    
    context = {
        'areas_salud': areas_salud,
        'prestamos': prestamos,
    }
    
    return render(request, 'prestamos.html', context)

def agregar_maquinaria(request):
    if request.method == 'POST':
        form = MaquinariaForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('maquinaria-list') # Redirige a la vista de lista de maquinaria
    else:
        form = MaquinariaForm()
    return render(request, 'agregarinventario.html', {'form': form})


def agregar_prestamo(request):
    if request.method == 'POST':
        form = PrestamoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('prestamos_area')  # Redirige a la vista de préstamos
    else:
        form = PrestamoForm()
    
    return render(request, 'agregar_prestamo.html', {'form': form})