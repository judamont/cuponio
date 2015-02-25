document.write("<script type='text/javascript' src='util.js'></script>");
var ultimaImagenPrueba;

var cupon = {
    codigo: 0, nombre: null, descripcion: null, fechaInicio: null, fechaFin: null, imagenBase64: null
};

var tienda = {
    codigo: null, nombre: null, email: null, clave: null
};

var centroComercial = {
    codigo: null, nombre: null, direccion: null
};

var categoria = {
    codigo: 0, nombre: null
};

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
                console.log(object.tienda.codigo);
                console.log(object.tienda.centroComercial.codigo);
                var linea = '<li>\n\<a href="#pre-rendered-page"';
                linea += 'onclick="mostrarCupon(\'' + object.tienda.centroComercial.codigo + '\',\'' + object.tienda.codigo + '\',' + object.categoria.codigo + ',' + object.codigo + ');"';
                linea += 'class="ui-btn ui-corner-all ui-shadow ui-btn-inline"   data-transition="pop">' + object.nombre;
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

function mostrarCupon(codCentroComercial, codTienda, codCategoria, codCupon) {

    centroComercial.codigo = codCentroComercial;
    tienda.codigo = codTienda;
    cupon.codigo = codCupon;
    categoria.codigo = codCategoria;

    var data = JSON.stringify({cupon: cupon, centroComercial: centroComercial, tienda: tienda, categoria: categoria});

    $.ajax({
        url: servicio + 'cupon/get/cupon',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: data,
        success: function (resp) {
            var contenido = '<p>En este popup va la información del cupon  <b>' + resp.nombre + '</b><p>';
            contenido += ' <br/><img src="data:image/jpg;base64,';
            contenido += resp.imagenBase64 + '"';
            contenido += ' alt="' + resp.descripcion + '"';
            contenido += ' style="width:100%;"/>';
            $('#contenidoCupon').html(contenido);
        }
    });
}

function obtenerCupon() {
    $('#autorizacionCupon').html('Cup&oacute;n V&aacute;lido');
}