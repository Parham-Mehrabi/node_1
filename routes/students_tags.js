const express = require('express');
const { listTags, addTag, removeTag } = require('../data/tags_queries')


const tags_routes = express.Router({ mergeParams: true });

tags_routes.get('/', async (req, res) => {
    const id = req.params.id;
    const tags = await listTags(id);
    if (tags) return res.send(tags)
    return res.status(404).send()
})

tags_routes.post('/', async (req, res) => {
    const student_id = req.params.id;
    const tag_id = req.body.tag_id;
    try {
        const resault = await addTag(student_id, tag_id);
        return res.status(201).send(resault)
    }
    catch (error) {
        if (error.message === 'tag id is not valid') return res
            .status(404)
            .send('tag not found');
        return res.status(500).send('unexpected server Error :(')
    }
})

tags_routes.delete('/', async (req, res) => {
    const student_id = req.params.id;
    const tag_id = req.body.tag_id;
    try {
        const resault = await removeTag(student_id, tag_id);
        return res.send(resault)
    }
    catch (error) {
        if (error.message === 'tag id is not valid') return res
            .status(404)
            .send('tag not found');
        return res.status(500).send('unexpected server Error :(')
    }
})
module.exports = tags_routes;
