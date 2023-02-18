const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(1).max(16);
const lastName = Joi.string().min(1).max(16);
const email = Joi.string().email();
const password = Joi.string().min(30);
const role = Joi.string();

const getUserSchema = Joi.object({
    idt: id.required()
});

const createUserSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    email: email.required(),
    password: password.required(),
    role: role.required()
});

const updateUserSchema = Joi.object({
    name,
    lastName,
    email,
    password,
    role
});

module.exports = { getUserSchema, createUserSchema, updateUserSchema }