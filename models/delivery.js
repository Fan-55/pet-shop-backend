'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    static associate(models) {
      Delivery.belongsTo(models.Order)
    }
  };
  Delivery.init({
    recipient: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    delivery_method: { type: DataTypes.STRING, allowNull: false },
    delivery_status: { type: DataTypes.STRING, allowNull: false },
    delivered_at: DataTypes.DATE,
    OrderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Delivery',
  });
  return Delivery;
};