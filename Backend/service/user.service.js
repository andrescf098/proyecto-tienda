const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UserService {
    async create(data) {
        const hash = await bcrypt.hash(data.password, 10);
        const newUser = await models.User.create({
            ...data,
            password: hash
        });
        delete newUser.dataValues.password;
        return newUser;
    }
    async find() {
        const user = await models.User.findAll();
        return user;
    }
    async findOne(id) {
        const user = await models.User.findByPk(id);
        if (!user) {
            throw boom.notFound('User not found')
        }
        return user;
    }
    async findByEmail(email) {
        const user = await models.User.findOne({
            where: { email }
        });
        if (!user) {
            throw boom.notFound('User not found')
        }
        return user;
    }
    async update(id, data) {
        const model = await this.findOne(id);
        const response = await model.update(data);
        return response;
    }
    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { response: true }
    }
}

module.exports = UserService;