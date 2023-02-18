const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom')

class UserService {
    async create(data) {
        const newUser = await models.User.create(data);
        return newUser;
    }
    async find() {
        const user = await models.User.findAll();
        return user;
    }
    async findOne(id) {
        const user = await models.user.findByPk(id);
        if (!user) {
            throw boom.notFound('User not found')
        }
        return user;
    }
    async update(id, data) {
        const model = await this.findOne(id);
        const response = await model.User.update(data);
        return response;
    }
    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { response: true }
    }
}