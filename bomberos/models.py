from django.db import models
from django.urls import reverse
# Create your models here.
class Post(models.Model):
    title=models.CharField(max_length=200)
    author=models.ForeignKey(
        "auth.user",
        on_delete=models.CASCADE,
    )
    body=models.TextField()

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("post_detail",kwargs={"pk":self.pk}) 
    

class Maquinaria(models.Model):
    CodigoElementos = models.AutoField(primary_key=True)
    Elemento = models.CharField(max_length=255)
    Marca=models.CharField(max_length=255)
    Cantidad = models.IntegerField()
    FechaIngreso = models.DateField()
    Estado = models.CharField(max_length=255)
    Imagen = models.ImageField(upload_to='maquinaria_images/')   # Campo para imágenes
    Tipo = models.CharField(max_length=255)
    Gabetas = models.CharField(max_length=255)
    Observacion=models.CharField(max_length=255)
    Mantencion = models.DateField()
    idUsuario= models.ForeignKey('auth.User', on_delete=models.CASCADE)  

    def __str__(self):
        return str(self.CodigoElementos)
class AreaSalud(models.Model):
    idAreaSalud = models.AutoField(primary_key=True)
    NombreArea = models.CharField(max_length=255)
    Telefono = models.CharField(max_length=255)
    CorreoElectronico = models.CharField(max_length=255)
    ResponsableAreaSalud = models.CharField(max_length=255)

    def __str__(self):
        return str(self.idAreaSalud)
    
class Prestamo(models.Model):
    idPrestamo = models.AutoField(primary_key=True)
    idAreaSalud = models.ForeignKey(AreaSalud, on_delete=models.CASCADE)  # Clave foránea a AreaSalud
    IdMaquinaria = models.ForeignKey(Maquinaria, on_delete=models.CASCADE)  # Clave foránea a Maquinaria
    Tipo = models.CharField(max_length=255)
    Descripcion = models.CharField(max_length=255)
    ElementoPrestado = models.CharField(max_length=255)
    FechaPrestamo = models.DateField()
    ESTADO_OPCIONES = (
        ('prestado', 'Prestado'),
        ('entregado', 'Entregado'),
        ('perdido', 'Perdido'),
    )

    Estado = models.CharField(max_length=255, choices=ESTADO_OPCIONES, default='prestado')


    def __str__(self):
        return f'Prestamo #{self.idPrestamo}'