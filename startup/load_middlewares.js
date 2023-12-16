const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const authenticate = require('../middlewares/authenticate')

module.exports = function (app) {
    app.set('view engine', 'pug');                      // pug middle ware which is a template engine
    app.set('views', './views');                        // default value is the same but we can modify it from here
    app.use(express.json())                             // to read the req.body
    app.use(express.urlencoded({ extended: true }))     // here we can post data with urlencoded
    app.use(express.static('public'))                   // specify the statics directory
    app.use(authenticate)                               // our costume middle ware for authorization
    app.use(helmet())                                   // helmet a security middleware
    if (app.get('env') === 'development') app.use(morgan('tiny'))
}