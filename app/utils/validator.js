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
    }).required(),
    betSchema: joi.object({
        id: joi.string().uuid(),
        eventId: joi.string().uuid().required(),
        betAmount: joi.number().min(1).required(),
        prediction: joi.string().valid('w1', 'w2', 'x').required(),
    }).required(),
    eventSchema: joi.object({
        id: joi.string().uuid(),
        type: joi.string().required(),
        homeTeam: joi.string().required(),
        awayTeam: joi.string().required(),
        startAt: joi.date().required(),
        odds: joi.object({
            homeWin: joi.number().min(1.01).required(),
            awayWin: joi.number().min(1.01).required(),
            draw: joi.number().min(1.01).required(),
        }).required(),
    }).required(),
}

const validateSchema = (schema, data) => {
    const {error} = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
}

module.exports = {schemas, validateSchema};