'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Cart)
      User.hasMany(models.Order)
    }
  };
  User.init({
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, unique: true },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: { type: DataTypes.STRING, unique: true, }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};