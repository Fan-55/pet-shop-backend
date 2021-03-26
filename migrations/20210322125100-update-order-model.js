'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Orders', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Orders', 'UserId', {
      type: Sequelize.INTEGER
    })
  }
}