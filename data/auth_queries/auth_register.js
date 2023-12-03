const AuthStudent = require('../../models/authentication/student_model')


async function createNewUser(new_student) {

    const newStudent = new AuthStudent
    newStudent.email = new_student.email
    newStudent.password = new_student.password
    // await newStudent.validate((err)=> {
    //     console.log(err)
    // })
    return await newStudent.save()

}


module.exports = createNewUser