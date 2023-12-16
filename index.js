const express = require('express');
require('express-async-errors')
const config = require('config')
const winston = require('winston')
require('winston-mongodb')
const helmet = require('helmet')
const morgan = require('morgan')
const authenticate = require('./middlewares/authenticate')
const Mongoose = require('mongoose')

const app = express();


winston.add(new winston.transports.File({ filename: 'logfile.log', level: 'silly' }))   // here we add a new File logger with silly level
winston.add(new winston.transports.Console({ level: 'info' }))                         // here we add a new console logger with info level
// winston.level = 'warn'   // we can declare default log level like this   
winston.add(new winston.transports.MongoDB({
    db: 'mongodb://127.0.0.1/node_app_logs',
    metaKey: 'metadata',
    level: 'error'
}))

// process.on('uncaughtException', (error) => {
//     console.log('unexpected error handled')
//     winston.error('UnExpected Error', {metadata: error})
//     process.exit(1)
// })

winston.exceptions.handle(new winston.transports.File({filename: 'unexpectedErrors.log'}))
// this one do the job itself and exit the app and its the correct way to handle it
// we should restart the project using process managers after such errors happened

// throw new Error('Some Error happened during start up.')

if (!config.get('JWT_SECRET_KEY')) {
    console.log('FATAL ERROR: JWT PRIVATE KEY NOT FOUND')
    process.exit(1)
}

// connect to DataBase:
Mongoose.connect('mongodb://127.0.0.1/node_app').then(() => console.log('connected to Mongodb'))
                                                .catch((err) => console.log("Could not Connect to MongoDB"))

// load middle wares:
app.set('view engine', 'pug');                      // pug middle ware which is a template engine
app.set('views', './views');                        // default value is the same but we can modify it from here
app.use(express.json())                             // to read the req.body
app.use(express.urlencoded({ extended: true }))     // here we can post data with urlencoded
app.use(express.static('public'))                   // specify the statics directory
app.use(authenticate)                               // our costume middle ware for authorization
app.use(helmet())                                   // helmet a security middleware



// routes:
require('./router')(app)

// logs:
if (app.get('env') === 'development') app.use(morgan('tiny'))


// listen 
const port = process.env.NODE_PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))
