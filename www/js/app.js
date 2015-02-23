/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
console.log("cargo");
$("#hoy").on("load", function (event) {
    console.log("navigated!");
});

$(document).on("pagebeforecreate", function (event) {
    console.log("antes de crear");
});
$(document).on("pagecreate", function (event) {
    console.log("pagina creada");
});

$(document).ready(function () {
    $.mobile.loading("show");
    $("#a_hoy").click(function () {
        alert('cargando cupones');
        $.mobile.navigate("#hoy");
    });
    $("#a_mis_cupones").click(function () {
        openFB.getLoginStatus(function (response) {
            if (response.status == 'connected') {
                alert(response.status);
                //codigo cupones usuario
            } else {
                alert('Ingresa para ver tus cupones')
            }
        });
    });
    $("#a_categorias").click(function () {
        alert('cargando categorias');
        $.mobile.navigate("#categorias");
    });
});