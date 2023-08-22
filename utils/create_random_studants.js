const mongoose = require('mongoose')
const faker = require('faker')
const Student = require('../models/student_model')
const { Tag } = require('../models/tag')

function getTags() {
    const tags = Tag.find()
    return tags
}
async function chooseRandomTags() {
    const tags = await getTags();
    const reSortedTags = tags.sort(() => Math.floor(Math.random() - 0.5));
    const selected_tags = reSortedTags.slice(0, (Math.floor(Math.random() * reSortedTags.length)) + 1)
    return selected_tags
}
async function createStudents() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/node_app');
        const my_promises = []
        for (let i = 0; i < 10; i++) {
            const studentObject = new Student
            studentObject.name = faker.name.firstName()
            studentObject.tags = await chooseRandomTags()
            my_promises.push(studentObject.save())
        }
        const students = await Promise.all(my_promises)
        students.map(student => console.log(student.name + ' created'))
        await mongoose.disconnect()
    }
    catch (error) { return console.error('ERROR:', error) }
    finally {
        console.log('Disconnected from Mongo.');
    }
}
createStudents()
