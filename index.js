const express = require('express');
const config = require('config')
// const logger = require('./middlewares/logger')
const helmet = require('helmet')
const morgan = require('morgan')
const authenticate = require('./middlewares/authenticate')
const app = express();
const students_route = require('./routes/students')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(authenticate)
app.use(helmet())

// routes:
app.use('/api/students/', students_route)


if (app.get('env') === 'development') app.use(morgan('tiny'))


const port = process.env.NODE_PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))

