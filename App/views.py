from django.shortcuts import render
from App.models import FichaMedica
from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
    return render(request, "index.html")
@csrf_exempt
def buscarFicha(request):
    if request.method == 'POST' :
        apellidos = request.POST.get('apellidos')
        fichas = FichaMedica.objects.filter(apellidos__contains=apellidos)
        data = list(fichas.values())
        return JsonResponse(data, safe=False)
    else:
        raise Http404('Método no permitido')

@csrf_exempt
def existeFicha(request):
    if request.method == 'POST':
        rut = request.POST.get('rut')
        data = 0
        if FichaMedica.objects.filter(rut=rut).exists(): data = 1

        return JsonResponse({'exit': data}, safe=False)
    else:
        raise Http404('Método no permitido')

@csrf_exempt
def guardarFicha(request):
    if request.method == 'POST' :
        try:
            rut = request.POST.get('rut')
            nombres = request.POST.get('nombres')
            apellidos = request.POST.get('apellidos')
            direccion = request.POST.get('direccion')
            ciudad = request.POST.get('ciudad')
            telefono = request.POST.get('telefono')
            email = request.POST.get('email')
            fechaNac = request.POST.get('fechaNac')
            estadoCivil = request.POST.get('estCivil')
            comentarios = request.POST.get('comentarios')

            ficha = FichaMedica(rut=rut, nombres=nombres, apellidos=apellidos,direccion=direccion, ciudad=ciudad, telefono=telefono,
                                email=email,fechaNac=fechaNac,                                estadoCivil=estadoCivil, comentarios= comentarios)
            ficha.save()

            return JsonResponse({'exit': 1}, safe=False)
        except Exception:
            return JsonResponse({'exit': 0}, safe=False)

    else:
        raise Http404('Método no permitido')

@csrf_exempt
def sobreescribirFicha(request):
    if request.method == 'POST':
        try:
            rut = request.POST.get('rut')
            nombres = request.POST.get('nombres')
            apellidos = request.POST.get('apellidos')
            direccion = request.POST.get('direccion')
            ciudad = request.POST.get('ciudad')
            telefono = request.POST.get('telefono')
            email = request.POST.get('email')
            fechaNac = request.POST.get('fechaNac')
            estadoCivil = request.POST.get('estCivil')
            comentarios = request.POST.get('comentarios')

            ficha = FichaMedica.objects.get(rut=rut)
            ficha.nombres = nombres
            ficha.apellidos = apellidos
            ficha.direccion = direccion
            ficha.ciudad = ciudad
            ficha.telefono = telefono
            ficha.email = email
            ficha.fechaNac = fechaNac
            ficha.estadoCivil = estadoCivil
            ficha.comentarios = comentarios
            ficha.save()

            return JsonResponse({'exit': 1}, safe=False)
        except Exception:
            return JsonResponse({'exit': 0}, safe=False)

    else:
        raise Http404('Método no permitido')




