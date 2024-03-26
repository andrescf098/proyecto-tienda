const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CategoryService {
  constructor() {}

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }
  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }
  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) {
      throw boom.notFound('Product not found');
    }
    return category;
  }
  async update(id, data) {
    const model = await this.findOne(id);
    const response = await model.update(data);
    return response;
  }
  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { response: true };
  }
}

module.exports = CategoryService;
