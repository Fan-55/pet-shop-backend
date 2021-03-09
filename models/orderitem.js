'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.Product)
      OrderItem.belongsTo(models.Order)
    }
  };
  OrderItem.init({
    quantity: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};