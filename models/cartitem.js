'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.Product)
      CartItem.belongsTo(models.Cart)
    }
  };
  CartItem.init({
    quantity: DataTypes.INTEGER,
    CartId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};