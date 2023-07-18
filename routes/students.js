const express = require('express');
const students_route = express.Router()
const validateStudent = require('../validations/validate_students')
const { getStudents, createNewStudent, updateStudent, retrieveStudent } = require('../data/student_queries')
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
    const new_student = {
        'name': req.body.name
    };
    try{
        await createNewStudent(new_student)
        res.status(201).send(new_student)
    }
    catch(e){
        return res.status(400).send(e.details[0].message)
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
    console.log(student)
    student.name = req.body.name
    
    await student.save()
    res.send(student)
})

students_route.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const student = students.find(s => s.id === id)
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.status(204).send()
})

module.exports = students_route
