const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: String,
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports.tagSchema = tagSchema;
module.exports.Tag = Tag;
