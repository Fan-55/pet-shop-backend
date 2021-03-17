const bcrypt = require('bcryptjs')
const { User } = require('../models/index')
const generateToken = require('../utils/token')
const { checkEmptyFields, checkMatch, checkEmailFormat } = require('../utils/validators')

module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body

    const { isFieldEmpty, emptyFieldError } = checkEmptyFields({ email, password })
    if (isFieldEmpty) return res.status(400).json({ message: emptyFieldError })

    const { isEmailFormatValid, emailFormatError } = checkEmailFormat(email)
    if (!isEmailFormatValid) return res.status(400).json({ message: emailFormatError })

    try {
      const user = await User.findOne({
        where: { email },
        attributes: {
          exclude: ['updatedAt', 'createdAt']
        },
        raw: true
      })
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Email或密碼錯誤' })
      } else {
        return res.json({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user)
        })
      }
    } catch (err) {
      next(err)
    }
  },
}