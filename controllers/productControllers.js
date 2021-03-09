const { Product } = require('../models/index')

module.exports = {
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.findAll({ raw: true })
      if (products.length) {
        return res.json(products)
      } else {
        return res.status(404).json({ message: 'Product Not Found' })
      }
    } catch (err) {
      next(err)
    }
  }
}