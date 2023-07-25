const mongoose = require('mongoose')
const faker = require('faker')
const Student = require('../models/student_model')


async function createStudents() {
    try{
        await mongoose.connect('mongodb://127.0.0.1/node_app');
        console.log('Connected to Mongo . . .');
        const my_promises = []
        for (let i = 0; i < 10; i++) {
            const studentObject = new Student
            // studentObject.name = 'parham'
            studentObject.name = faker.name.firstName()
            studentObject.tags = faker.datatype.array(faker.datatype.number(3))
            studentObject.tags2 = faker.datatype.array((faker.datatype.number(3)+1))
            my_promises.push(studentObject.save())
        }
        const students = await Promise.all(my_promises)
        students.map(student => console.log(student.name + ' created'))
        await mongoose.disconnect()
    }
    catch (error){return console.error('ERROR:', error)}
    finally{
        console.log('Disconnected from Mongo.');
    }
}
createStudents()


