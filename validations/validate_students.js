const Joi = require('joi');


function validateStudent(data) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required().trim(),

        tags: Joi.array().items(Joi.string()).min(1).required(),

        friends: Joi.array().items(Joi.string()),

        courses: Joi.array().items(Joi.object({
            soldPrice: Joi.number().required(),
            reference: Joi.string().required(),
        })).required(),
    });

    resault = schema.validate(data)
    return resault
}

module.exports = validateStudent
