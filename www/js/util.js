var servicio = "http://cuponrs-oxes.rhcloud.com/webresources/cupon/get/cuponlist";
//var servicio = "http://localhost:8081/webresources/";

function message(e) {
    var html = $.parseHTML(e.responseText)
    if (html != null) {
        for (var i = 0; i < html.length; i++) {
            if (html[i].innerHTML != null && html[i].innerHTML.indexOf('java.lang') !== -1) {
                return html[i].innerHTML.split(":")[1];
            }
        }
    }
}

function mensajeSoporte() {
    alert('Error no controlado, contactenos para asistirte o intenta de nuevo.');
}

$('#cuponia').bind('pageinit', function(event) {
	getCuponesList();
});

function getCuponesList() {
    //var cupones = {
    //  "nombre": "cupon 1",
    //  "tienda": "Arturo Calle"
    //};
                        $.ajax({
                            url: servicio,
                            type: 'GET',
                            dataType: 'json',
                            contentType: 'application/json',
                            success: function (resp) {
                                var cupon = resp;
                                        $.each(cupon, function(index, item) {
                                           
                                                $('#cupones').append('<li>' +item+'</li>');
                                       
                                        });
            
                            }
                        });
}

