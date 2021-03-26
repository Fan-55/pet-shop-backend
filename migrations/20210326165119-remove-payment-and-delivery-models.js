'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.dropTable('Payments', {}),
      queryInterface.dropTable('Deliveries', {}),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.createTable('Payments', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        payment_method: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        payment_status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        paid_at: {
          type: Sequelize.DATE
        },
        OrderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
      queryInterface.createTable('Deliveries', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        recipient: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        delivery_method: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        delivery_status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        delivered_at: {
          type: Sequelize.DATE
        },
        OrderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
    ])
  }
};
