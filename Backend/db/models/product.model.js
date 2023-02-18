const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model')

const PRODUCT_TABLE = 'products';

const ProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nameProduct: {
        field: 'name_product',
        allowNull: false,
        type: DataTypes.STRING
    },
    priceProduct: {
        field: 'price_product',
        allowNull: false,
        type: DataTypes.INTEGER
    },
    stock: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    descriptionProduct: {
        field: 'description_product',
        allowNull: false,
        type: DataTypes.TEXT
    },
    image: {
        allowNull: false,
        type: DataTypes.STRING
    },
    promotion: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    discount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    createAt: {
        field: 'create_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    categoryId: {
        field: 'category_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CATEGORY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class Product extends Model {
    static associate(models) {
        this.belongsTo(models.Category, { as: 'category' });
      }
    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false
        }
    };
}
module.exports = { Product, ProductSchema, PRODUCT_TABLE }