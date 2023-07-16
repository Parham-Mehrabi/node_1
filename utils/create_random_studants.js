const mongoose = require('mongoose')
const faker = require('faker')



const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }
})
const Student = mongoose.model('students', studentSchema)

async function createStudents() {
    try{
        await mongoose.connect('mongodb://127.0.0.1/node_app');
        console.log('Connected to Mongo . . .');
        const my_promises = []
        for (let i = 0; i < 10; i++) {
            const studentObject = new Student
            studentObject.name = faker.name.firstName()
            my_promises.push(studentObject.save())
        }
        const students = await Promise.all(my_promises)
        students.map(student => console.log(student.name + ' created'))
        await mongoose.disconnect()
        console.log('Disconnected from Mongo.');
    }
    catch (error){console.error('ERROR:', error)}
}
createStudents()
