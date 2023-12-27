const User = require('../../../models/authentication/student_model');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const payload = {
            email: 'bob@example.com',
            _id: new mongoose.Types.ObjectId().toHexString()
        }
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('JWT_SECRET_KEY'));

        expect(decoded).toMatchObject(payload);
    });
});