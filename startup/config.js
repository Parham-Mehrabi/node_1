const config = require('config')
const winston = require('winston')

module.exports = function () {
    if (!config.get('JWT_SECRET_KEY')) throw new Error('FATAL ERROR: JWT PRIVATE KEY NOT FOUND')
}
