'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.hasMany(models.CartItem)
      Cart.belongsTo(models.User)
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};