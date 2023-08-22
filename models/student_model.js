const mongoose = require('mongoose')
const { myAsyncValidationWork } = require('../validations/model_validations/students')
const { courseInstanceSchema } = require('./course')
const { tagSchema } = require('./tag')


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        // uppercase: true,
        lowercase: true,
    },

    // embeded(nested) aproach
    tags: {     // embeded
        type: [tagSchema],
        validate: {
            validator: async function (v) {
                return await myAsyncValidationWork(v)
            },
            message: 'a student should at least has one tag'
        },
    },

    // refrence aproach
    friends: [{  // refrence
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],

    // hybrid aproach
    courses: {      // hybrid
        type: [courseInstanceSchema],
    },
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student
