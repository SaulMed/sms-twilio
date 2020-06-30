const socketIO = require('socket.io');

let socket;

const connection = server => {
    const io = socketIO.listen(server)  //Cargar en el Frontend SocketIO

    io.on('connection', newSocket => {
        socket = newSocket;
        console.log(newSocket.id)
    })

}

const getSocket = () => socket //Devolver socket almacenado

module.exports = { connection, getSocket }