const Mongoose = require('mongoose')
const { myAsyncValidationWork } = require('../validations/model_validations/students')


const studentSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    nickName: {
        type: String,
        enum: ['kami sama', 'parham sama'],
        required: function () { return this.name === 'parham' }
        // this field (nickName) is only required when name is equal to parham
    },
    tags: {
        type: [String],
        required: true,
        // how ever its required but its allowed to save [] so its not what we want
    },
    tags2: {
        type: Array,
        validate: {
            validator: async function (v) {
                return await myAsyncValidationWork(v)
            },
            message: 'a student should at least has one tag2'
        }
        // both tags and tags2 are required but you can pass an empty array [] to the second one

    }
})

const Student = Mongoose.model('students', studentSchema)

module.exports = Student

