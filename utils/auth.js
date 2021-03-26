const jwt = require('jsonwebtoken')

const isUserLogin = (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      req.user = user
      next()
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  } else {
    return res.status(401).json({ message: '尚未登入' })
  }
}

exports.isUserLogin = isUserLogin