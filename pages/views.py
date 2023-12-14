from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth import login,authenticate
from django.shortcuts import render,redirect  # Importa la función render
from .forms import CustomUserForm
class InicioPageView(TemplateView):
    template_name = "inicio.html"

class QuienesPageView(TemplateView):
    template_name = "Quienes.html"

class FormsPageView(TemplateView):
    template_name = "forms.html"

class RegistroPageView(TemplateView):
    template_name = "registro.html"

class Inicio2PageView(TemplateView):
    template_name = "inicio2.html"
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
         return super().dispatch(*args, **kwargs)
    
class InventarioPageView(TemplateView):
    template_name = "inventario.html"

class Inventario2PageView(TemplateView):
    template_name = "inventario2.html"

def registro_usuario(request):
    data = {
        'form': CustomUserForm()
    }
    if request.method == 'POST':
        formulario = CustomUserForm(request.POST)
        if formulario.is_valid():
            formulario.save()  # Corrección: usa save() en lugar de saved()
            # Página inicio
            username = formulario.cleaned_data['username']
            password = formulario.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect("inicio2")
    return render(request, 'registration/registrar.html',data)


