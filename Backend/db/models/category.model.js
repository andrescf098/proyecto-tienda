const { Model, DataTypes, Sequelize } = require('sequelize');
const CATEGORY_TABLE = 'categories';

const CategorySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    category: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    createAt: {
        field: 'create_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
};

class Category extends Model {
    static associate(models) {
      this.hasMany(models.Product, {
        as: 'products',
        foreignKey: 'categoryId'
      })
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        }
    };
}
module.exports = { Category, CategorySchema, CATEGORY_TABLE }