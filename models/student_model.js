const Mongoose = require('mongoose')

const studentSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }
})

const Student = Mongoose.model('students', studentSchema)

module.exports = Student
