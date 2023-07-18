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

async function getStudents(){
    try{
        return await Student.find()
    }
    catch (error){
        console.error(error)
    }
}
async function retrieveStudent(id){
    try{
        return await Student.findById(id)
    }
    catch (error){
        console.error(error)
        return
    }
}

async function getStudentObject(id){
    const studentObject = await Student.findById(id)
    if (!studentObject) return;
    return studentObject

}
async function updateStudent(id, updated_fields){
    const student = await Student.findByIdAndUpdate(id, {
        $set:{
            updated_fields
        }
    })
    if (!student) return;
    return student

}



module.exports.getStudents = getStudents
module.exports.createNewStudent = createNewStudent
module.exports.getStudentObject = getStudentObject
module.exports.retrieveStudent = retrieveStudent
module.exports.updateStudent = updateStudent
