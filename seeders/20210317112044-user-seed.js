'use strict'
const bcrypt = require('bcryptjs')

let { users } = require('./seed/data')
users = users.map(u => ({
  ...u,
  password: bcrypt.hashSync(u.password, bcrypt.genSaltSync(10)),
  createdAt: new Date(),
  updatedAt: new Date()
}))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}