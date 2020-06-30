//Variables de Entorno
require('dotenv').config()

const app = require('./server')     //Main App
const http = require('http')    //Modulo necesario para socket.io

const server = http.createServer(app) //SocketIO trabaja en conjunto con protocolo HTTP

require('./database')       //Database
require('./sockets').connection(server)     //Llamando a la funcion connection del archivo sockets

server.listen(app.get('port'),()=>{
    console.log('Server on port '+app.get('port'))
})