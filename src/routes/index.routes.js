const { Router } = require('express')

//Controller
const {
    ListMessages,
    SaveMessage,
    receiveMessage
} = require('../controllers/index.controller')


class indexRoutes {

    constructor() {
        this.router = Router();
        this.Routes();
    }

    Routes() {
        this.router.get('/', ListMessages)
        this.router.post('/send-sms', SaveMessage)
        this.router.post('/sms', receiveMessage)
    }

}

const IndexRoutes = new indexRoutes();
module.exports = IndexRoutes.router;