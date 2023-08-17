const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        }
    }
);

const courseInstanceSchema = new mongoose.Schema({
    soldPrice: Number,
    reference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
});

const Course = mongoose.model('course', courseSchema);

module.exports.Course = Course
module.exports.courseSchema = courseSchema
module.exports.courseInstanceSchema = courseInstanceSchema