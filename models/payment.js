'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Order)
    }
  };
  Payment.init({
    payment_method: DataTypes.STRING,
    payment_statue: DataTypes.STRING,
    paid_at: DataTypes.DATE,
    OrderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};