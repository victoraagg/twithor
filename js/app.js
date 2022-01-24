if(navigator.serviceWorker){
    navigator.serviceWorker.register('./sw.js');
}

var db = new PouchDB('heroes');
var remoteCouch = false;

var titulo = $('#titulo');
var nuevoBtn = $('#nuevo-btn');
var salirBtn = $('#salir-btn');
var cancelarBtn = $('#cancel-btn');
var postBtn = $('.post-btn');
var avatarSel = $('#seleccion');
var timeline = $('#timeline');
var modal = $('#modal');
var modalAvatar = $('#modal-avatar');
var avatarBtns = $('.seleccion-avatar');
var txtMensaje = $('#txtMensaje');

var usuario;

function printMessagesUI(mensaje) {
    mensaje.map(element => {
        if (element.doc.heroe == usuario) {
            crearMensajeHTML(element.doc.title, element.doc.heroe)
        }
    })
}

function crearMensajeHTML(mensaje, personaje) {
    var content = `
    <li class="animated fadeIn fast">
        <div class="avatar">
            <img src="img/avatars/${ personaje }.jpg">
        </div>
        <div class="bubble-container">
            <div class="bubble">
                <h3>@${ personaje }</h3>
                <br/>
                ${ mensaje }
            </div>
            <div class="arrow"></div>
        </div>
    </li>
    `;
    timeline.prepend(content);
    cancelarBtn.click();
}

function borrarMensajes() {
    timeline.empty();
}

function logIn() {
    nuevoBtn.removeClass('oculto');
    salirBtn.removeClass('oculto');
    timeline.removeClass('oculto');
    avatarSel.addClass('oculto');
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
        printMessagesUI(doc.rows);
    });
}

function logOut() {
    nuevoBtn.addClass('oculto');
    salirBtn.addClass('oculto');
    timeline.addClass('oculto');
    avatarSel.removeClass('oculto');
    modal.addClass('oculto');
    borrarMensajes();
    titulo.text('Seleccione Personaje');
}

avatarBtns.on('click', function() {
    usuario = $(this).data('user');
    titulo.text('@' + usuario);
    logIn();
});

salirBtn.on('click', function() {
    logOut();
});

nuevoBtn.on('click', function() {
    modal.removeClass('oculto');
    modal.animate({ 
        zIndex: 1,
        opacity: 1
    }, 200 );
});

cancelarBtn.on('click', function() {
   modal.animate({ 
       opacity: 0
    }, 200, function() {
        modal.addClass('oculto');
        txtMensaje.val('');
    });
});

postBtn.on('click', function() {
    var mensaje = txtMensaje.val();
    if ( mensaje.length === 0 ) {
        cancelarBtn.click();
        return;
    }
    crearMensajeHTML( mensaje, usuario );
    var todo = {
        _id: new Date().toISOString(),
        heroe: usuario,
        title: mensaje
    };
    db.put(todo, function callback(err, result) {
        if (!err) {
        }
    });
});