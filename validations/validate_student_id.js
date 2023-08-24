const Joi = require('joi');


function validateStudentID(data) {
    const schema = Joi.object().keys({
        friend_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    });

    resault = schema.validate(data)
    return resault
}

module.exports = validateStudentID;
