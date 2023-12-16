const express = require('express')
const errorMiddleware = require('./middlewares/error')
const students_route = require('./routes/students')
const auth_route = require('./routes/auth_routes/auth_routes')
const pug_route = require('./routes/pug_route')

module.exports = function(app){
    app.use('/', pug_route)
    app.use('/api/students/', students_route)   // student end-points
    app.use('/api/auth/', auth_route)           // authentication end-pints

    // error middleware
    app.use(errorMiddleware)
}
