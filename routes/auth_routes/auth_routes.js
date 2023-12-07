const express = require('express')
const createNewUser = require('../../data/auth_queries/auth_register')
const AuthUser = require('../../models/authentication/student_model')
const _ = require('lodash')
const hashedPassword = require('./hash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')


const auth_route = express.Router()

auth_route.post('/register', async (req, res) => {

    let user = await AuthUser.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already registered')
    try {
        const raw_password = req.body.password
        req.body.password = await hashedPassword(raw_password)
        const new_student = await createNewUser(req.body)
        res.send(_.pick(new_student, ['_id', 'email']))
        return
    } catch (e) {
        return res.status(400).send(e.errors)  // we need to handle it more properly
    }

})

auth_route.post('/login', async (req, res) => {
    let user = await AuthUser.findOne({ email: req.body.email });       // check if user exists
    if (!user) return res.status(400).send('Invalid username or password.')

    const is_valid = await bcrypt.compare(req.body.password, user.password)   // check if password is correct
    if (!is_valid) return res.status(400).send('Invalid username or password.')

    token = jwt.sign({email: user.email}, config.get('JWT_SECRET_KEY'))
    res.send(token)
})


module.exports = auth_route
