const Joi = require('joi');

const id = Joi.number().integer();
const nameProduct = Joi.string().min(4);
const priceProduct = Joi.number().integer();
const stock = Joi.number().integer();
const descriptionProduct = Joi.string().min(15);
const image = Joi.string().uri();
const promotion = Joi.boolean();
const discount = Joi.number().integer().max(100);
const categoryId = Joi.number().integer();

const getProductSchema = Joi.object({
  id: id.required(),
});

const createProductSchema = Joi.object({
  nameProduct: nameProduct.required(),
  priceProduct: priceProduct.required(),
  stock: stock.required(),
  descriptionProduct: descriptionProduct.required(),
  image: image.required(),
  categoryId: categoryId.required(),
  promotion: promotion,
  discount: discount,
});

const updateProductSchema = Joi.object({
  nameProduct,
  priceProduct,
  stock,
  descriptionProduct,
  image,
  promotion,
  discount,
  categoryId,
});

module.exports = { getProductSchema, createProductSchema, updateProductSchema };
