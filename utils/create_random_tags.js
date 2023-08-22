const mongoose = require('mongoose')
const faker = require('faker')
const { Tag } = require('../models/tag')


async function createTags() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/node_app');
        const my_promises = []
        for (let i = 0; i < 10; i++) {
            const studentObject = new Tag
            studentObject.name = faker.random.word()
            my_promises.push(studentObject.save())
        };
        const Tags = await Promise.all(my_promises);
        Tags.map(tag => console.log(`created "${tag.name}"`))
        await mongoose.disconnect()
        console.info('disconnected from DB')
        return Tags
    }
    catch (e) {
        return console.error(e)
    }
};
createTags();

