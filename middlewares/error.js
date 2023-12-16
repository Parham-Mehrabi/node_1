const winston = require('winston')

module.exports = function(e, req, res, next){
    // const time = new Date()     we don't need timestamp when we use MongoDB to store the logs
    winston.error(e.message, { metadata: { myErrorStack:  e, otherKeys: "otherValues" } })
    // metadata is the default keyName for winston-mongodb we can change it

    // winston.error(e.message,{ metadata: { metaKey:  'metaValue' } })
    // winston.warn(e.message, e)
    // winston.info(e.message, e)
    // winston.debug(e.message, e)
    // winston.verbose(e.message, e)
    // winston.silly(e.message, e)
    return res.status(500).send('Internal Server Error.')
}
