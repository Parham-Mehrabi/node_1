const Mongoose = require('mongoose')
const winston = require('winston')
const config = require('config')


module.exports = function () {
    const db = config.get('db')
    Mongoose.connect(db)
        .then(() => {winston.info(`Connected to ${db}`);})
}
