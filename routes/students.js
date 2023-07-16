const express = require('express');
const Joi = require('joi');
const students_route = express.Router()
const Mongoose = require('mongoose')
const Student = require('../models/student_model')

function validateStudent(data) {
    const schema = Joi.object().keys(
        {
            name: Joi.string().min(3).required()
        }
    )
    resault = schema.validate(data)
    return resault
}

async function getStudents(){
    try{

        await Mongoose.connect('mongodb://127.0.0.1/node_app')
        const students = await Student.find()
        return students
    }
    catch (error){
        console.error(error)
    }
    finally{
        await Mongoose.disconnect();
    }
    
}


students_route.get('/', async (req, res) => {
    const students = await getStudents()
    res.send(students.map(s => s.name));
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