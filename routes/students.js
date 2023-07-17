const express = require('express');
const students_route = express.Router()
const validateStudent = require('../validations/validate_students')
const { getStudents, createNewStudent } = require('../data/student_queries')

students_route.get('/', async (req, res) => {
    const students = await getStudents()
    res.send(students.map(s => s.name));
});


students_route.get('/:name',async (req, res) => {
    const name = req.params.name
    const students = await getStudents(name)
    const student = students.find(s => s.name.toLowerCase() === name.toLowerCase());
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


students_route.put('/api/students/:id', (req, res) => {
    const { error } = validateStudent(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const id = parseInt(req.params.id)
    const student = students.find(s => s.id === id)
    if (!student) return res.status(404).send('student with the given ID not found')
    student.name = req.body.name
    res.send(student)
})

students_route.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const student = students.find(s => s.id === id)
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.status(204).send()

})

module.exports = students_route
