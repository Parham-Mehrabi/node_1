const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = function(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('Access Denied. Unauthorized')
    try {
        const decoded = jwt.verify(token, config.get('JWT_SECRET_KEY'))
        req.user = decoded
        req.is_authenticated = true
        next()
    } catch (e) {
        req.user = 'anonymous';
        req.is_authenticated = false
        return res.status(401).send('Invalid Token')
    }
}
