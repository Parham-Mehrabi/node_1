const Joi = require('joi');


function validateStudent(data) {

    const schema = Joi.object().keys(
        {
            name: Joi.string().min(3).required().trim()
        }
    )
    resault = schema.validate(data)
    return resault
}

module.exports = validateStudent
