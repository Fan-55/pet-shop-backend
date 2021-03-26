const bcrypt = require('bcryptjs')
const { User } = require('../models/index')
const generateToken = require('../utils/token')
const { checkEmptyFields, checkMatch, checkEmailFormat } = require('../utils/validators')

module.exports = {
  register: async (req, res, next) => {
    const { name, email, phone, password, confirmPassword } = req.body

    const { isFieldEmpty, emptyFieldError } = checkEmptyFields({ name, email, password, confirmPassword })
    if (isFieldEmpty) return res.status(400).json({ message: emptyFieldError })

    const errors = []
    const { isEmailFormatValid, emailFormatError } = checkEmailFormat(email)
    if (!isEmailFormatValid) {
      errors.push(emailFormatError)
    } else {
      try {
        const duplicateEmail = await User.findOne({ where: { email }, raw: true })
        if (duplicateEmail) errors.push('Email已被註冊')
      }
      catch (err) {
        next(err)
      }
    }
    const { isMatch, matchError } = checkMatch({ password, confirmPassword })
    if (!isMatch) errors.push(matchError)

    if (phone) {
      const duplicatePhone = await User.findOne({ where: { phone }, raw: true })
      if (duplicatePhone) errors.push('電話已被註冊')
    }
    if (errors.length) {
      return res.status(400).json({ message: errors })
    }

    try {
      const user = await User.create({
        name,
        email,
        phone,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      })
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user)
      })
    } catch (err) {
      next(err)
    }
  },
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