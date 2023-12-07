const jwt = require('jsonwebtoken')
const config = require('config')


function auth(req, res, next) {
    const token = req.header('x-auth-token')
    try {
        const decoded = jwt.verify(token, config.get('JWT_SECRET_KEY'))
        req.user = decoded
        req.is_authenticated = true
    } catch (e) {
        req.user = 'anonymous';
        req.is_authenticated = false
    }
    next()
}

module.exports = auth
