const { Model, DataTypes, Sequelize } = require('sequelize');
const USER_TABLE = 'users';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primatyKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    lastName: {
        field: 'last_name',
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING
    },
    createAt: {
        field: 'create_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
};

class User extends Model {
    static associate() {

    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelNamel: 'User',
            timestamps: false
        }
    }
};

module.exports = { User, UserSchema, USER_TABLE }