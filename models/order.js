'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.OrderItem)
      Order.hasMany(models.Payment)
      Order.hasOne(models.Delivery)
      Order.belongsTo(models.User)
    }
  };
  Order.init({
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};