const express = require('express')
const router = express.Router()

const productControllers = require('../controllers/productControllers')

router.get('/api/products', productControllers.getProducts)

router.use((err, req, res, next) => {
  console.log(err)
  return res.status(500).json({ message: 'Internal Server Error', error: err })
})

module.exports = router