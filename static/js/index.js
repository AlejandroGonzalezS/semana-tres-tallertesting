$(document).ready(function (){

    $('#btnBuscar').click(function () {
        var txtBuscar = $('#txtBuscar').val();

            if(txtBuscar.length != 0) {
            $.ajax({
              url: 'buscarFicha/',
              type: 'POST',
              data: {'apellidos': txtBuscar},

              success: function(response) {
                  $('#modalBody').empty();

    for(var i=0; i<response.length; i++) {

        var th = $('<th>', {scope: 'col'}).text(i+1);
        var td1 = $('<td>').text(response[i].rut);
        var td2 =   $('<td>').text(response[i].nombres);
        var td3 =   $('<td>').text(response[i].apellidos);
        var td4= $('<td>');
        var button = $('<button>', {type: 'button', class: 'btn btn-primary'}).text("Seleccionar");
        td4.append(button);

        (function (index) {
            button.on('click', function () { 
                $('#modalClose').click();

                $('#run').val(response[index].rut);
                $('#nombres').val(response[index].nombres);
                $('#apellidos').val(response[index].apellidos);
                $('#direccion').val(response[index].direccion);
                $('#ciudad').val(response[index].ciudad);
                $('#telefono').val(response[index].telefono);
                $('#email').val(response[index].email);
                $('#fechaNac').val(response[index].fechaNac);
                $('#estCivil').val(response[index].estadoCivil);
                $('#comentarios').val(response[index].comentarios);

                $('#fichaMedica').click();
            });
        })(i);

        var tr = $('<tr>');
        tr.append(th)
        tr.append(td1)
        tr.append(td2)
        tr.append(td3)
        tr.append(td4)
                  $('#modalBody').append(tr);
    }

                $('#modalBusqueda').modal('show');
              },
              error: function(xhr, status, error) {
                console.log('Error en la solicitud AJAX:', error);
              }
            });
            }else {alert("Complete el campo Apellidos!");}
    });

    $('#btnLimpiar').click(function () {
        $('#run').val("");
                $('#nombres').val("");
                $('#apellidos').val("");
                $('#direccion').val("");
                $('#ciudad').val("");
                $('#telefono').val("");
                $('#email').val("");
                $('#fechaNac').val("");
                $('#estCivil').val("");
                $('#comentarios').val("");
    });

    $('#btnCerrar').click(function () {
        $('#fichaMedica').click();
    });

    $('#btnGuardar').click(function () {
           var run =$('#run').val();
    var nombres = $('#nombres').val();
    var apellidos = $('#apellidos').val();
    var direccion = $('#direccion').val();
    var ciudad = $('#ciudad').val();
    var telefono = $('#telefono').val();
    var email = $('#email').val();
    var fechaNac = $('#fechaNac').val();
    var estCivil = $('#estCivil').val();
    var comentarios = $('#comentarios').val();

    if(run.length != 0 && nombres.length != 0 && apellidos.length != 0 && direccion.length != 0 && ciudad.length != 0 && telefono.length != 0 &&
        email.length != 0 && fechaNac.length != 0 && estCivil.length != 0 && comentarios != 0) {

         $.ajax({
          url: 'existeFicha/',
          type: 'POST',
          data: {'rut': run},
          success: function(response) {
if(response.exit == 1) {
    var modalSobre = $('#modalSobreFicha');
    modalSobre.modal('show');
    modalSobre.on('click', '#modalSobre',  function () {
        $.ajax({
          url: 'sobreescribirFicha/',
          type: 'POST',
          data: {'rut': run, 'nombres': nombres, 'apellidos': apellidos, 'direccion': direccion, 'ciudad': ciudad,
            'telefono': telefono, 'email': email, 'fechaNac': fechaNac, 'estCivil': estCivil, 'comentarios': comentarios},
          success: function(response) {
if(response.exit == 1) {
createAlert("Sobreescrita con éxito!", {id: 'alert', class: 'alert alert-success', role: 'alert', style: 'width: 800px;'});
}else {
createAlert("Error al intentar guardar!", {id: 'alert', class: 'alert alert-danger', role: 'alert', style: 'width: 800px;'});
}
          },
          error: function(xhr, status, error) {
            createAlert("Error en la solicitud!", {id: 'alert', class: 'alert alert-danger', role: 'alert', style: 'width: 800px;'});
          }
        });
    })
}else {
                    $.ajax({
          url: 'guardarFicha/',
          type: 'POST',
          data: {'rut': run, 'nombres': nombres, 'apellidos': apellidos, 'direccion': direccion, 'ciudad': ciudad,
            'telefono': telefono, 'email': email, 'fechaNac': fechaNac, 'estCivil': estCivil, 'comentarios': comentarios},
          success: function(response) {
if(response.exit == 1) {
createAlert("Guardada con éxito!", {id: 'alert', class: 'alert alert-success', role: 'alert', style: 'width: 800px;'});
}else {
createAlert("Error al intentar guardar!", {id: 'alert', class: 'alert alert-danger', role: 'alert', style: 'width: 800px;'});
    }
          },
          error: function(xhr, status, error) {
            createAlert("Error en la solicitud!", {id: 'alert', class: 'alert alert-danger', role: 'alert', style: 'width: 800px;'});
          }
        });
}
          },
          error: function(xhr, status, error) {
            createAlert("Error en la solicitud!", {id: 'alert', class: 'alert alert-danger', role: 'alert', style: 'width: 800px;'});
          }
        });
    }else{createAlert("Complete todos los campos!", {id: 'alert', class: 'alert alert-warning', role: 'alert' , style: 'width: 800px;'});}
    });

    $('#modalSobre').click(function() {})

    function createAlert(text, attr) {
            var body = $('#body');

            if(body.find('#alert').length) {
                $('#alert').remove()
            }

            var div = $('<div>', {class: ' d-flex justify-content-center align-items-center'})
                    var alert = $('<div>', attr).text(text);
                div.append(alert)
                    body.append(div);
    }

});



