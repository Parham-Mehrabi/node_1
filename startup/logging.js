const winston = require('winston')
require('winston-mongodb')

module.exports = function () {

    winston.add(new winston.transports.File({ filename: 'logfile.log', level: 'silly' }))   // here we add a new File logger with silly level
    winston.add(new winston.transports.Console({ level: 'info' }))                         // here we add a new console logger with info level
    // winston.level = 'warn'   // we can declare default log level like this   
    winston.add(new winston.transports.MongoDB({
        db: 'mongodb://127.0.0.1/node_app_logs',
        metaKey: 'metadata',
        level: 'error'
    }))

    // process.on('uncaughtException', (error) => {
    //     console.log('unexpected error handled')
    //     winston.error('UnExpected Error', {metadata: error})
    //     process.exit(1)
    // })

    winston.exceptions.handle(new winston.transports.File({ filename: 'unexpectedErrors.log' }))
    winston.exceptions.handle(new winston.transports.Console())
    // this one do the job itself and exit the app and its the correct way to handle it
    // we should restart the project using process managers after such errors happened

    // throw new Error('Some Error happened during start up.')
}
