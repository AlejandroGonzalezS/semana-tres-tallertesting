from django.test import TestCase
from App.models import FichaMedica
# Create your tests here.

ficha = FichaMedica.objects.filter(rut='19313983-3')
ficha.nombres = ficha.nombres + " 2"
ficha.save()