const AuthStudent = require('../../models/authentication/student_model')
const _  = require('lodash')

async function createNewUser(new_student) {

    // const newStudent = new AuthStudent({email:new_student.email, password: new_student.password})    // manual approach
    const newStudent = new AuthStudent( _.pick(new_student, ['email', 'password']))                     // lodash approach
    return await newStudent.save()

}


module.exports = createNewUser
