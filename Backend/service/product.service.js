const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom')

class ProductService {

    constructor() {}

    async create(data) {
        const newProduct = await models.Product.create(data);
        return newProduct;
    }
    async find() {
        const products = await models.Product.findAll();
        return products;
    }
    async findOne(id) {
        const product = await models.Product.findByPk(id);
        if (!product) {
            throw boom.notFound('Product not found')
        }
        return product;
    }
    async update(id, data) {
        const model = await this.findOne(id);
        const response = await model.Product.update(data);
        return response;
    }
    async delete(id) {
        const product = await this.findOne(id);
        await product.destroy();
        return { response: true };
    }
}

module.exports = ProductService;