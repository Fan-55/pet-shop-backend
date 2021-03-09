'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Brand)
      Product.belongsTo(models.Category)
      Product.hasMany(models.CartItem)
      Product.hasMany(models.OrderItem)
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    BrandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};