'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Payments', 'payment_status', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })
    await queryInterface.changeColumn('Payments', 'payment_method', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    await queryInterface.changeColumn('Payments', 'OrderId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Payments', 'payment_status', {
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('Payments', 'payment_method', {
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('Payments', 'OrderId', {
      type: Sequelize.INTEGER
    })
  }
}