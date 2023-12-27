const express = require('express');
require('express-async-errors')
const winston = require('winston')


const app = express();

// logging 
require('./startup/logging')()

// connect to DataBase:
require('./startup/db')()

// load middle wares:
require('./startup/load_middlewares')(app)

// routes:
require('./startup/router')(app)

// config:
require('./startup/config')

// listen 
const port = process.env.NODE_PORT || 3000
app.listen(port, () => winston.info(`listening on port ${port}`))

module.exports = app