const Mongoose = require('mongoose')

const studentSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    nickName: {
        type: String,
        enum: ['kami sama', 'parham sama'],
        required: function () {return this.name === 'parham'} 
        // this field (nickName) is only required when name is equal to parham
    }
})

const Student = Mongoose.model('students', studentSchema)

module.exports = Student
