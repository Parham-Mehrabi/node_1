const express = require('express')

const pug_route = express.Router()

pug_route.get('/', (req, res) => {    // index page to use pug
    res.render('index', { title: 'my title for index', message: 'this is page rendered using pug' })
})

module.exports = pug_route;