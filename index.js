const express = require('express');
require('express-async-errors')
const winston = require('winston')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json')

const app = express();


// swagger docs
app.use('/api/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// logging 
require('./startup/logging')()

// connect to DataBase:
require('./startup/db')()


// loading production middlewares
require('./startup/prod')(app)

// load middle wares:
require('./startup/load_middlewares')(app)

// routes:
require('./startup/router')(app)

// config:
require('./startup/config')

// listen 
const port = process.env.NODE_PORT || 3000
const server = app.listen(port, () => winston.info(`listening on port ${port}`))

module.exports = server
