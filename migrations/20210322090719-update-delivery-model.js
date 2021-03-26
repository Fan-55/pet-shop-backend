'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Deliveries', 'delivery_status', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Deliveries', 'delivery_status', {
      type: Sequelize.STRING,
      allowNull: false
    })
  }
}