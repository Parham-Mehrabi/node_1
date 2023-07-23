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
    },
    tags: {
        type: [String],
        required: true,
        // how ever its required but its allowed to save [] so its not what we want
    },
    tags2: {
        type: Array,
        validate: {
            validator: function(v) { return v.length > 0},
            message: 'a student should at least has one tag2'
        }
        // both tags and tags2 are required but you can pass an empty array [] to the second one

    }
})

const Student = Mongoose.model('students', studentSchema)

module.exports = Student
