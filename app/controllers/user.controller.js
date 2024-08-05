const userService = require('../services/user.service');
const {validateSchema, schemas} = require('../utils/validator');
const jwt = require("jsonwebtoken");
const joi = require("joi");

const getUserById = async (req, res) => {
    try {
        validateSchema(schemas.idSchema, req.params)
    } catch (e) {
        res.status(400).send({error: e.message});
        return;
    }
    const user = await userService.getUserById(req.db, req.params.id);
    if (!user) {
        return res.status(404).send({error: 'User not found'});
    }
    res.send(user);
}

const createUser = async (req, res) => {
    try {
        validateSchema(schemas.userSchema, req.body)
    } catch (e) {
        res.status(400).send({error: e.message});
        return;
    }
    try {
        const user = await userService.createUser(req.db, req.body);
        return res.send(user);
    } catch (err) {
        return res.status(err.status ? err.status : 500).send({error: err.message ? err.message : "Internal Server Error"})
    }
}

const updateUser = async (req, res) => {
    try {
        validateSchema(schemas.updateUserSchema, req.body)
    } catch (e) {
        res.status(400).send({error: e.message});
        return;
    }
    if (req.params.id !== req.user.id) {
        return res.status(401).send({error: 'UserId mismatch'});
    }
    try {
        const user = await userService.updateUser(req.db, req.params.id, req.body);
        return res.send(user);
    } catch (err) {
        return res.status(err.status ? err.status : 500).send({error: err.message ? err.message : "Internal Server Error"})
    }
}

module.exports = {createUser, updateUser, getUserById}