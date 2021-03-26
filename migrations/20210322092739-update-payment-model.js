'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Payments', 'payment_statue', 'payment_status')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Payments', 'payment_status', 'payment_statue')
  }
}