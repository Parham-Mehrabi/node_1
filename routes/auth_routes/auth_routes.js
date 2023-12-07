const express = require('express')
const createNewUser = require('../../data/auth_queries/auth_register')
const AuthUser = require('../../models/authentication/student_model')

const auth_route = express.Router()

auth_route.post('/register', async (req, res) => {
    // validation:
    // const { error } = ourImaginaryRegisterValidateFunction(req.body)
    // if (error) return res.status(400).send(error message)
    let user = await AuthUser.findOne({email: req.body.email});
    if (user) return res.status(400).send('user already registered')
    try {

        const new_student = await createNewUser(req.body)
        res.send(new_student)
    }catch (e){
        res.status(400).send(e.errors)  // we need to handle it more properly
    }

})

module.exports = auth_route
