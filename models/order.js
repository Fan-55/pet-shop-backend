'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.OrderItem)
      Order.belongsTo(models.User)
    }
  };
  Order.init({
    recipient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    delivered_at: DataTypes.DATE,
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    paid_at: DataTypes.DATE,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    delivery_fee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sn: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};