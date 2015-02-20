document.write("<script type='text/javascript' src='util.js'></script>");
var ultimaImagenPrueba;
$('#cuponia').bind('pageinit', function (event) {
    getCuponesList();
});

function getCuponesList() {
    $.ajax({
        url: servicio + 'cupon/get/listaCupones',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (resp) {
            for (var n = 0; n < resp.length; n++)
            {
                var object = JSON.parse(resp[n]);
                var linea = '<li>\n\<a href="#pre-rendered-page" onclick="mostrarCupon(' + object.codigo + ',\'' + object.nombre + '\');" class="ui-btn ui-corner-all ui-shadow ui-btn-inline"   data-transition="pop">' + object.nombre;
                linea += ' <br/><img src="data:image/jpg;base64,';
                linea += object.imagenBase64 + '"';
                linea += ' alt="0"';
                linea += ' style="width:100%;"/>';
                linea += '</a></li>';
//                console.log(linea);
                ultimaImagenPrueba = object.imagenBase64;
                $('#cupones').append(linea);
            }
            $.mobile.loading("hide");
        }
    });
}

function mostrarCupon(codigo, nombre) {
    var contenido = '<p>En este popup va la información del cupon  <b>' + codigo +' - '+nombre  + '</b><p>';
    contenido += ' <br/><img src="data:image/jpg;base64,';
    contenido += ultimaImagenPrueba + '"';
    contenido += ' alt="0"';
    contenido += ' style="width:100%;"/>';
    $('#contenidoCupon').html(contenido);
}

function obtenerCupon(){
    $('#autorizacionCupon').html('Cup&oacute;n V&aacute;lido');    
}