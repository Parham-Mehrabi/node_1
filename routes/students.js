const express = require('express');
const Joi = require('joi');
const students_route = express.Router()



let students = [
    { 'id': 1, 'name': 'first student' },
    { 'id': 2, 'name': 'second student' },
    { 'id': 3, 'name': 'third student' }, 
    { 'id': 4, 'name': 'fourth student' },
    { 'id': 5, 'name': 'fifth student' }
]

function validateStudent(data) {
    const schema = Joi.object().keys(
        {
            name: Joi.string().min(3).required()
        }
    )
    resault = schema.validate(data)
    return resault
}



students_route.get('/', (req, res) => {
    res.send(students);
});


students_route.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const student = students.find(s => s.id === id);
    if (!student) return res.status(404).send('student with the given ID not found')
    res.send(student)
});


students_route.post('/', (req, res) => {
    const { error } = validateStudent(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const new_student = {
        'id': students.length + 1,
        'name': req.body.name
    };
    students.push(new_student)
    res.send(students)
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