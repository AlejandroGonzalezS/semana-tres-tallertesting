from django.db import models

# Create your models here.

class FichaMedica(models.Model):
    rut = models.CharField(verbose_name="Rut", max_length=10, primary_key=True)
    nombres = models.CharField(verbose_name="Nombres", max_length=64)
    apellidos = models.CharField(verbose_name="Apellidos", max_length=64)
    direccion = models.CharField(verbose_name="Dirección", max_length=128)
    ciudad = models.CharField(verbose_name="Ciudad", max_length=32)
    telefono = models.CharField(verbose_name="Teléfono", max_length=12)
    email = models.CharField(verbose_name="Email", max_length=64)
    fechaNac = models.DateField(verbose_name="Fecha de Nacimiento")
    estadoCivil = models.CharField(verbose_name="Estado Civil", max_length=32)
    comentarios = models.CharField(verbose_name="Comentarios", max_length=256)

    class Meta:
        verbose_name = "Ficha Médica"
        verbose_name_plural = "Fichas Médicas"
        db_table = "FichaMedica"
        ordering = ['nombres']