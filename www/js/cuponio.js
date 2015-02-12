var servicio = "http://cuponrs-oxes.rhcloud.com/webresources/cupon/get/cuponlist";
//var servicio = "http://localhost:8081/webresources/";

$('#cuponia').bind('pageinit', function (event) {
    getCuponesList();
});

function getCuponesList() {

    $.ajax({
        url: servicio,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (resp) {
            for (var n = 0; n < resp.length; n++)
            {
                var object = JSON.parse(resp[n]);
                $('#cupones').append('<li><a href="#popupBasic" onclick="mostrarCupon(\''+object.nombre+'\');" data-rel="popup" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-transition="pop">'+object.nombre+'</a></li>');
            }
        }
    });
}

function mostrarCupon(nombre){
    $('#contenidoCupon').html('<p>En este popup va la información del cupon <b>'+nombre+'</b><p>');
}