const express = require('express')
const router = express.Router()

const productControllers = require('../controllers/productControllers')
const userControllers = require('../controllers/userControllers')
const orderControllers = require('../controllers/orderControllers')

const { isUserLogin } = require('../utils/auth')


router.get('/api/products', productControllers.getProducts)
router.get('/api/products/:id', productControllers.getProduct)

router.post('/api/register', userControllers.register)
router.post('/api/login', userControllers.login)

router.post('/api/orders', isUserLogin, orderControllers.createOrder)
router.get('/api/orders/:id', isUserLogin, orderControllers.getOrder)

router.post('/api/newebpay/callback', orderControllers.newebpayCallback)

router.use((err, req, res, next) => {
  console.log(err)
  return res.status(500).json({ message: 'Internal Server Error', error: err })
})

module.exports = router