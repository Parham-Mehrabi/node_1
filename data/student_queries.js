const Mongoose = require('mongoose')
const Student = require('../models/student_model')


async function createNewStudent(new_student){
    try{
        await Mongoose.connect('mongodb://127.0.0.1/node_app')
        const newStudent = new Student
        newStudent.name = new_student.name
        await newStudent.save()
    }
    catch (error){
        console.error(error)
    }
    finally{
        await Mongoose.disconnect();
    }
}

async function getStudents(name){
    try{
        await Mongoose.connect('mongodb://127.0.0.1/node_app')
        if (!name){
            return await Student.find()
        }else if(name){
            return await Student.find({name: new RegExp(`^${name}$`, 'i')})
            // return await Student.find({name: name})      this one is Case-sensetive
        }
    }
    catch (error){
        console.error(error)
    }
    finally{
        await Mongoose.disconnect();
    }
}

module.exports.getStudents = getStudents
module.exports.createNewStudent = createNewStudent
