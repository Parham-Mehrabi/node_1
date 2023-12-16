const Mongoose = require('mongoose')
const winston = require('winston')

module.exports = function () {
    Mongoose.connect('mongodb://127.0.0.1/node_app').then(() => {
        return winston.info('Connected to Mongodb')
    })
}
