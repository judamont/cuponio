/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
document.write("<script type='text/javascript' src='cuponio.js'></script>");

$("#hoy").on("load", function (event) {
//    console.log("navigated!");
});

$(document).on("pagebeforecreate", function (event) {
//    console.log("antes de crear");
});
$(document).on("pagecreate", function (event) {
//    console.log("pagina creada");
});

$(document).ready(function () {
    $.mobile.loading("show");
    $("#a_hoy").click(function () {
        $('#cupones').html("");
        $('#status').html(status());
        getCuponesList();
    });
    $("#a_mis_cupones").click(function () {
        openFB.getLoginStatus(function (response) {
            if (response.status == 'connected') {
                $('#status').html(status());
                $('#cupones_usuario').html("");
                openFB.api({
                    path: '/me',
                    success: function (data) {
                        console.log(JSON.stringify(data));
                        cargarListaCuponesUsuario(data);
                    },
                    error: errorHandler});
            } else {
                //alert('Ingresa para ver tus cupones')
                login();
            }
        });
    });
    $("#a_categorias").click(function () {
        alert('cargando categorias');
        $.mobile.navigate("#categorias");
    });
});
