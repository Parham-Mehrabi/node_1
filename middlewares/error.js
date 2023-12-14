const winston = require('winston')

module.exports = function(e, req, res, next){
    const time = new Date()
    winston.log('error', e.message, {time: time, test:'test'})  // first method to create a log with error level
    winston.error(e.message, {time: time, test:'test'})         // second method to create a log with error level
    winston.warn(e.message, {time: time, test:'test'})
    
    winston.info(e.message, {time: time, test:'test'})
    winston.debug(e.message, {time: time, test:'test'})
    winston.verbose(e.message, {time: time, test:'test'})
    winston.silly(e.message, {time: time, test:'test'})
    return res.status(500).send('Internal Server Error.')
}
