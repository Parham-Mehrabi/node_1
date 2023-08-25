const Student = require('../models/student_model')
const { Tag } = require('../models/tag')


function listTags(id) {
    return Student.findById(id).select('tags.name tags._id')
};

async function addTag(student_id, tag_id) {
    const tag = await Tag.findById(tag_id)
    if (!tag) throw Error('tag id is not valid')
    const updated_student =  await Student.findByIdAndUpdate(student_id, {
        $push: { tags: tag }
    },
        { new: true })

    console.log(updated_student);
    return updated_student;
};

async function removeTag(student_id, tag_id) {
    const tag = await Tag.findById(tag_id)
    if (!tag) throw Error('tag id is not valid')
    const updated_student =  await Student.findByIdAndUpdate(student_id, {
        $pullAll: { tags: tag }
    },
        { new: true })

    console.log(updated_student);
    return updated_student;
};

module.exports.listTags = listTags;
module.exports.addTag = addTag;
module.exports.removeTag = removeTag;