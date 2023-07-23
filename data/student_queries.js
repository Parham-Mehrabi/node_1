const Student = require('../models/student_model')


async function createNewStudent(new_student) {

    const newStudent = new Student
    newStudent.name = new_student.name
    newStudent.nickName = new_student.nickName
    newStudent.tags = new_student.tags
    newStudent.tags2 = new_student.tags2
    // await newStudent.validate((err)=> {
    //     console.log(err)
    // })
    return await newStudent.save()

}

async function getStudents() {
    try {
        return await Student.find()
    }
    catch (error) {
        console.error(error)
    }
}
async function retrieveStudent(id) {
    try {
        return await Student.findById(id)
    }
    catch (error) {
        console.error(error)
        return
    }
}

async function getStudentObject(id) {
    const studentObject = await Student.findById(id)
    if (!studentObject) return;
    return studentObject

}
async function updateStudent(id, updated_fields) {
    const student = await Student.findByIdAndUpdate(id, {
        $set: updated_fields
    }, { new: true })
    // this way we don't retrieve the object and save it here but we do it inside the DB
    // the "{new:true} make the student object to be the updated version of the object"
    if (!student) return;
    return student

}
async function deleteStudent(id) {
    const student = await Student.findByIdAndRemove(id)
    // const student = await Student.deleteOne({_id: id})
    if (!student) return;
    return student
}



module.exports.getStudents = getStudents
module.exports.createNewStudent = createNewStudent
module.exports.getStudentObject = getStudentObject
module.exports.retrieveStudent = retrieveStudent
module.exports.updateStudent = updateStudent
module.exports.deleteStudent = deleteStudent
