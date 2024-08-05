const joi = require('joi');

const schemas = {
    idSchema: joi.object({
        id: joi.string().uuid(),
    }).required(),
    userSchema: joi.object({
        id: joi.string().uuid(),
        type: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi.string().pattern(/^\+?3?8?(0\d{9})$/).required(),
        name: joi.string().required(),
        city: joi.string(),
    }).required(),
    updateUserSchema: joi.object({
        email: joi.string().email(),
        phone: joi.string().pattern(/^\+?3?8?(0\d{9})$/),
        name: joi.string(),
        city: joi.string(),
    }).required()
}

const validateSchema = (schema, data) => {
    const {error} = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
}

module.exports = {schemas, validateSchema};