const socket = io() //Hace la conexion por defecto al puerto que se este trabajando ,comparte socket-id con Frontend y Backend

//Cuestionar autorizacion de alertas desde el navegador
//https://developer.mozilla.org/es/docs/Web/API/notification
Notification.requestPermission().then(function (result) {
    console.log(result);
});

function notifyMe(message = 'Hi there') {   //Mensaje de notificacion
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(message);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(message);
            }
        });
    }

    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
}


socket.on('new message', data => {   //Estar a la escucha del evento 'new message' que emite el Server 
    console.log(data)

    notifyMe('New SMS Received')    //Ejecutar notificacion

    const messagesList = document.getElementById('messages') //Lista desordenada

    const li = document.createElement('li')
    li.classList = 'list-group-item list-group-item-warning list-group-item-action text-center'

    const body = document.createElement('p')
    body.appendChild(document.createTextNode(data.Body)) //Agregar al li el contenido body del SMS

    data.From = data.From.replace(/[0-9]/g, 'x')  //Reemplazar digitos por X
    const from = document.createElement('span')
    from.appendChild(document.createTextNode(data.From))    //Agregar al li quien envio el SMS

    const id = document.createElement('span')
    id.appendChild(document.createTextNode(data._id))

    const createdAt = document.createElement('span')
    createdAt.appendChild(document.createTextNode(timeago.format(data.createdAt)))

    //Agregar datos al li
    li.appendChild(body)
    li.appendChild(id)
    li.appendChild(from)
    li.appendChild(createdAt)
    
    //messagesList.appendChild(li)  Mostrar nuevo SMS hasta el FINAL de la lista
    messagesList.prepend(li) //Mostrar SMS nuevo al INICIO de la lista
})  