const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json())


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

app.get('/api/students/', (req, res) => {
    res.send(students);
});


app.get('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const student = students.find(s => s.id === id);
    res.send(student)
});


app.post('/api/students/', (req, res) => {
    const { error } = validateStudent(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    console.log(error)
    const new_student = {
        'id': students.length + 1,
        'name': req.body.name
    };
    students.push(new_student)
    res.send(students)
})


app.put('/api/students/:id', (req, res) => {
    const { error } = validateStudent(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const id = parseInt(req.params.id)
    const student = students.find(s => s.id === id)
    student.name = req.body.name
    res.send(student)
})


app.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const student = students.find(s => s.id === id)
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.status(204).send()

})



const port = process.env.NODE_PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))

