const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)


function validateStudentID(data) {
    const schema = Joi.object().keys({
        // friend_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        friend_id: Joi.objectId().required(),
    });

    result = schema.validate(data)
    return result
}

module.exports = validateStudentID;
