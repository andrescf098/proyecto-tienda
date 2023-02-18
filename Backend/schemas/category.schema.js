const Joi = require('joi');

const id = Joi.number().integer();
const category = Joi.string().min(1).max(16);


const getCategorySchema = Joi.object({
    id: id.required()
});

const createCategorySchema = Joi.object({
    category: category.required()
});

const updateCategorySchema = Joi.object({
    category
});
module.exports = { getCategorySchema, createCategorySchema, updateCategorySchema }