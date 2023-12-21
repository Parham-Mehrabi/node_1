const auth = require('../../../middlewares/authenticate')
const User = require('../../../models/authentication/student_model')
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')

describe('auth middleware', () => {
    it('Should add user to request object with a valid token', () => {
        const user = new User({
            email: 'example@example.com',
            _id: new mongoose.Types.ObjectId().toHexString()
        })
        token = jwt.sign({ email: user.email }, config.get('JWT_SECRET_KEY'))
        
        const req = {header: jest.fn().mockReturnValue(token)};
        const res = {};
        const next = jest.fn();
        auth(req, res, next);
        
        expect(req.user.email).toBe(user.email)
        expect(req.is_authenticated).toBeTruthy()
    })

    it('Should not authenticate user with no valid token', () => {
        const token = 'not a valid token'
        const req = {header: jest.fn().mockReturnValue(token)};
        const res = {};
        const next = jest.fn();
        auth(req, res, next);
        
        expect(req.user).toBe('anonymous')
        expect(req.is_authenticated).toBeFalsy()
    })

})