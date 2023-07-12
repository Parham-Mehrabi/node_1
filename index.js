const express = require('express');
const config = require('config')
// const logger = require('./middlewares/logger')
const helmet = require('helmet')
const morgan = require('morgan')
const authenticate = require('./middlewares/authenticate')
const app = express();
const students_route = require('./routes/students')



app.set('view engine', 'pug');
app.set('views', './views');      // default

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(authenticate)
app.use(helmet())


app.get('/', (req, res) => {
    res.render('index', {title: 'my title for index', message: 'this is page rendered using pug'})
})
// routes:
app.use('/api/students/', students_route)

if (app.get('env') === 'development') app.use(morgan('tiny'))


const port = process.env.NODE_PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))

