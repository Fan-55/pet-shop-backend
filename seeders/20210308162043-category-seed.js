'use strict'

let { categories } = require('./seed/data')
categories = categories.map(c => ({
  ...c,
  createdAt: new Date(),
  updatedAt: new Date()
}))


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', categories, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}