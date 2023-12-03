// for tutorial we use this student model instead since it is more simple
const mongoose = require('mongoose')


const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        validate: {
            validator: (v) => {
                return v.length > 8
            },
            message: 'password is too short'
        }
    }
})

const AuthStudent = mongoose.model('AuthStudent', studentSchema)

module.exports = AuthStudent
