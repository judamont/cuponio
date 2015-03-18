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

var usuario = {
    nombre: null, apellido: null, correo: null, edad: 0, fechaNacimiento: null, codigo: null, clave: null, claveConfirmacion: null
}

$('#cuponia').bind('pageinit', function (event) {
    getCuponesList();
});

function getCuponesList() {
    $('#status').html("<center><img src='./img/spinner.gif'/></center>");
    $.ajax({
        url: servicio + 'cupon/get/listaCupones',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (resp) {
            for (var n = 0; n < resp.length; n++)
            {
                var object = JSON.parse(resp[n]);
//                console.log(object.tienda.codigo);
//                console.log(object.tienda.centroComercial.codigo);
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
            $('#status').html("");
        }
    });
}

function mostrarCupon(codCentroComercial, codTienda, codCategoria, codCupon) {

    centroComercial.codigo = codCentroComercial;
    tienda.codigo = codTienda;
    cupon.codigo = codCupon;
    categoria.codigo = codCategoria;

    var data = JSON.stringify({cupon: cupon, centroComercial: centroComercial, tienda: tienda, categoria: categoria});
    $('#status').html("<center><img src='./img/spinner.gif'/></center>");
    $('#contenidoCupon').html("<br/>&nbsp;&nbsp;<span><b>--- Cargando Datos Cupón ---</b></span>");

    $('#pre-rendered-page').html(function () {
        $.mobile.loading("show");
    });

    $('#descripcionCupon').html("");
    $.ajax({
        url: servicio + 'cupon/get/cupon',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: data,
        success: function (resp) {
            cupon.codigo = resp.codigo;
            var contenido = '<h1><b>' + resp.nombre + '</b></h1>';
            contenido += ' <br/><img src="data:image/jpg;base64,';
            contenido += resp.imagenBase64 + '"';
            contenido += ' alt="' + resp.descripcion + '"';
            contenido += ' style="width:100%;"/>';
            $('#contenidoCupon').html(contenido);
            $('#descripcionCupon').html(resp.descripcion);
            $.mobile.loading("hide");
        }
    });
}

function obtenerCupon() {
    openFB.api({
        path: '/me',
        success: function (data) {
            console.log(JSON.stringify(data));
            asociarCuponUsuario(data);
            document.getElementById("userName").innerHTML = data.name;
            document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';

        },
        error: errorHandler});
//    $('#autorizacionCupon').html('Cup&oacute;n V&aacute;lido');
}

function registrarUsuario(response) {
    usuario.nombre = response.first_name;
    usuario.apellido = response.last_name;
    usuario.correo = response.email;

    $.ajax({
        url: servicio + 'generic/post/usuario',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (resp) {
            //función cargar cupones usuario.
            cargarCuponesUsuario(resp);
        },
        error: function (e) {
            var mensaje = message(e);
            if (mensaje == null) {
                mensajeSoporte();
            } else {
                alert(mensaje);
            }
        }
    });
}

function asociarCuponUsuario(usuarioFb) {
    usuario.nombre = usuarioFb.first_name;
    usuario.apellido = usuarioFb.last_name;
    usuario.correo = usuarioFb.email;

    var data = JSON.stringify({cupon: cupon, centroComercial: centroComercial, tienda: tienda, categoria: categoria, usuario: usuario});
    $.ajax({
        url: servicio + 'cupon/post/cuponUsuario',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: data,
        success: function (resp) {
            alert('obtuviste el cupon :)');
        },
        error: function (e) {
            var mensaje = message(e);
            if (mensaje == null) {
                mensajeSoporte();
            } else {
                alert(mensaje);
            }
        }
    });
}

function cargarCuponesUsuario(resp) {
    $('#cupones_usuario').html("");
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

        ultimaImagenPrueba = object.imagenBase64;
        $('#cupones_usuario').append(linea);
    }
}

function cargarListaCuponesUsuario(usuarioFb) {
    usuario.nombre = usuarioFb.first_name;
    usuario.apellido = usuarioFb.last_name;
    usuario.correo = usuarioFb.email;

    $.ajax({
        url: servicio + 'cupon/get/listaCuponesUsuario',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (resp) {
            cargarCuponesUsuario(resp);
        },
        error: function (e) {
            var mensaje = message(e);
            if (mensaje == null) {
                mensajeSoporte();
            } else {
                alert(mensaje);
            }
        }
    });
}