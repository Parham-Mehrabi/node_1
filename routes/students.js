const express = require('express');
const students_route = express.Router()
const validateStudent = require('../validations/validate_students')
const { getStudents, createNewStudent, updateStudent, retrieveStudent, deleteStudent } = require('../data/student_queries')
const mongoose = require('mongoose')


students_route.get('/', async (req, res) => {
    const students = await getStudents()
    res.send(students.map((s) => ({ id: s._id, name: s.name })));
});


students_route.get('/:id',async (req, res) => {
    const id = req.params.id
    const student = await retrieveStudent(id)
    if (!student) return res.status(404).send('student with the given ID not found')
    res.send(student)
});


students_route.post('/',async (req, res) => {
    // validation:
    const { error } = validateStudent(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    // add new user
    try{
        const new_student = await createNewStudent(req.body)
        res.status(201).send(new_student)
    }
    catch(e){
        console.log(e)
        return res.status(400).send(e)
    }
})


students_route.put('/:id', async (req, res) => {
    const { error } = validateStudent(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // get the id from url
    const id = req.params.id

    // check if id looks like a real id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send('invalid ID')

    const student = await updateStudent(id, req.body)
    if (!student) return res.status(404).send('student with the given ID not found')

    // sience we dont retrieve the object with getStudentObject, we dont need these steps anymore (unlike privious commits)
    // student.name = req.body.name
    // await student.save()
    res.send(student)
})

students_route.delete('/:id', async(req, res) => {

    const id = req.params.id

    // check if id looks like a real id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send('invalid ID')

    const student = await deleteStudent(id)
    if (!student) return res.status(404).send('student with the given ID not found')
    res.status(204).send()
})

module.exports = students_route
