const Student = require('../models/student_model')


async function createNewStudent(new_student){
    try{
        const newStudent = new Student
        newStudent.name = new_student.name
        await newStudent.save()
    }
    catch (error){
        console.error(error)
    }
}

async function getStudents(name){
    try{
        if (!name){
            return await Student.find()
        }else if(name){
            return await Student.find({name: new RegExp(`^${name}$`, 'i')}).select({name:1, _id:1})
            // return await Student.find({name: name})      this one is Case-sensetive
        }
    }
    catch (error){
        console.error(error)
    }
}

module.exports.getStudents = getStudents
module.exports.createNewStudent = createNewStudent
