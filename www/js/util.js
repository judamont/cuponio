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
