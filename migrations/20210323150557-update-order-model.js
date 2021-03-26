'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn('Orders', 'recipient', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('Orders', 'phone', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('Orders', 'address', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('Orders', 'delivery_method', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('Orders', 'delivery_status', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }),
      queryInterface.addColumn('Orders', 'delivered_at', {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('Orders', 'delivery_fee', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.addColumn('Orders', 'payment_method', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('Orders', 'payment_status', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }),
      queryInterface.addColumn('Orders', 'paid_at', {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('Orders', 'subtotal', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.addColumn('Orders', 'total', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.removeColumn('Orders', 'recipient'),
      queryInterface.removeColumn('Orders', 'phone'),
      queryInterface.removeColumn('Orders', 'address'),
      queryInterface.removeColumn('Orders', 'delivery_method'),
      queryInterface.removeColumn('Orders', 'delivery_status'),
      queryInterface.removeColumn('Orders', 'delivered_at'),
      queryInterface.removeColumn('Orders', 'delivery_fee'),
      queryInterface.removeColumn('Orders', 'payment_method'),
      queryInterface.removeColumn('Orders', 'payment_status'),
      queryInterface.removeColumn('Orders', 'paid_at'),
      queryInterface.removeColumn('Orders', 'subtotal'),
      queryInterface.removeColumn('Orders', 'total'),
    ])
  }
}