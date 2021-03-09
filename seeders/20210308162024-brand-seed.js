'use strict';

let { brands } = require('./seed/data')

brands = brands.map(b => ({
  ...b,
  createdAt: new Date(),
  updatedAt: new Date()
}))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Brands', brands, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Brands', null, {})
  }
};
