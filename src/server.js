const express = require('express')
const morgan = require('morgan')
const path = require('path')
const exphbs = require('express-handlebars')

//Routes 
const indexRoutes = require('./routes/index.routes')

class Server{

    constructor(){
        this.app = express();
        this.Config();
        this.Routes();
    }

    Config(){
        this.app.set('port', process.env.PORT || 4500)
        this.app.set('views', path.join(__dirname, '/views'))
        //Middlewares
        this.app.use(morgan('dev'))
        this.app.use(express.urlencoded({extended:false}))
        this.app.use(express.json())
        //Motor de plantillas
        this.app.engine('.hbs', exphbs({
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            extname: '.hbs',
            helpers: require('./libs/helpers')
        }))
        this.app.set('view engine', '.hbs')
        //Public Files
        this.app.use(express.static(path.join(__dirname, '/public')))
    }

    Routes(){
        this.app.use(indexRoutes)
    }

}

module.exports = new Server().app;