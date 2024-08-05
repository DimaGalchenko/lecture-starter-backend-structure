const userModel = require('../models/user.model');
const jwt = require("jsonwebtoken");
const statEmitter = require('../../index').statEmitter;

const getUserById = async (db, id) => {
    return await userModel.getUserById(db, id);
}

const createUser = async (db, user) => {
    user.balance = 0;
    const newUser = await userModel.createUser(db, user);
    return {...newUser, accessToken: jwt.sign({id: newUser.id, type: newUser.type}, process.env.JWT_SECRET)};
    //statEmitter.emit('newUser');
}

const updateUser = async (db, userId, userDetails) => {
    return await userModel.updateUser(db, userId, userDetails);
}

module.exports = {createUser, updateUser, getUserById};
