const express = require('express');
const config = require('config')
// const logger = require('./middlewares/logger')
const helmet = require('helmet')
const morgan = require('morgan')
const authenticate = require('./middlewares/authenticate')
const students_route = require('./routes/students')
const Mongoose = require('mongoose')


const app = express();

async function startApp(){

// connect to DataBase:
await Mongoose.connect('mongodb://127.0.0.1/node_app')
console.log('connected to Mongodb')

// load middle wares:
app.set('view engine', 'pug');                      // pug middle ware which is a template engine
app.set('views', './views');                        // default value is the same but we can modify it from here
app.use(express.json())                             // to read the req.body
app.use(express.urlencoded({ extended: true }))     // here we can post data with urlencoded
app.use(express.static('public'))                   // specify the statics directory
app.use(authenticate)                               // our costume middle ware for authorization
app.use(helmet())                                   // helmet a security middleware



// routes:
app.get('/', (req, res) => {
    res.render('index', {title: 'my title for index', message: 'this is page rendered using pug'})
})
app.use('/api/students/', students_route)


// logs:
if (app.get('env') === 'development') app.use(morgan('tiny'))


// listen 
const port = process.env.NODE_PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))

}

startApp()
