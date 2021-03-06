const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  const { id, name, email, role } = user
  return jwt.sign({ id, name, email, role }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = generateToken