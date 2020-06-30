const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { sendMessage } = require('../twilio/send-sms')
const { getSocket } = require('../sockets')
//import 'noty/lib/themes/nest.css'
//const Noty = require('noty')

//Model
const SMS = require('../models/sms');

const indexCtrl = {}

indexCtrl.ListMessages = async (req, res) => {
    const messages = await SMS.find().sort('-createdAt').lean() //Ordenar del mas nuevo al mas viejo
    //messages.forEach(message => console.log(message))
    res.render('index', { messages })
}

indexCtrl.SaveMessage = async (req, res) => {
    const { message, phone } = req.body;
    if (!message || !phone) return res.json('Missing message or phone')
    //Enviar SMS con twilio
    const result = await sendMessage(message, phone)
    console.log(result.sid)
    //Guardar en MongoDB
    await SMS.create({ Body: message, To: phone })
/*    new Noty({
        theme: 'nest',
        type: 'success',
        layout: 'center',
        text: 'Message Sended Successfully',
        timeout: 3000
    }).show()
*/    res.redirect('/')
}

indexCtrl.receiveMessage = async (req,res)=>{
    console.log(req.body)
    //Guardar en la base de datos
    const saveSMS = await SMS.create({
        Body: req.body.Body,
        From: req.body.From
    })
    //WebSocket
    getSocket().emit('new message',saveSMS) //Emitir evento al FrontEnd
    //Regresar respuesta de twilio
    const twiml = new MessagingResponse()
    twiml.message('This is my reponse') // <Response>This is my response</Response>
    res.send(twiml.toString())
}

module.exports = indexCtrl;