const express = require('express');
const { listFriends, addFriend, removeFriendByID } = require('../data/friends_queries')
const validateStudentID = require('../validations/validate_student_id')

const friends_routes = express.Router({ mergeParams: true });

friends_routes.get('/', async (req, res) => {
    const id = req.params.id;
    const student = await listFriends(id)
    res.send(student);
});

friends_routes.post('/', async (req, res) => {
    try{
        const student_id = req.params.id
        const friend_id = req.body.friend_id
        const { error } = validateStudentID(req.body)
        if (error) return res.status(400).send(error)           // if req.body was not valid return 400
        const resault = await addFriend(student_id, friend_id)
        if (resault) return res.status(201).send(resault)       // if update successfully return 201
        return res.status(404).send('user not found')           // if student_ID was not valid return 404
    }
    catch (error) {
        console.error(error);
        res.status(500).send('server error :(')                 // if unexpected server error happened return 500
    }
});

friends_routes.delete('/', async (req, res) => {
    try{
        const student_id = req.params.id;
        const friend_id = req.body.friend_id;
        const { error } = validateStudentID(req.body)
        if (error) return res.status(400).send(error)
        const resault = await removeFriendByID(student_id, friend_id)
        if (resault) return res.status(200).send(resault) 
        return res.status(404).send('user not found')   
    }
    catch (error){
        console.log(error)
        res.status(500).send('server error :(')
    }
})


module.exports = friends_routes
