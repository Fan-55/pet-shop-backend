const { Product, Brand, Category } = require('../models/index')

module.exports = {
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.findAll({
        attributes: {
          exclude: ['updatedAt', 'createdAt']
        },
        include: [
          { model: Brand, attributes: ['name'] },
          { model: Category, attributes: ['name'] }
        ],
        raw: true,
        nest: true
      })
      if (products.length) {
        return res.json(products)
      } else {
        return res.status(404).json({ message: 'Product Not Found' })
      }
    } catch (err) {
      next(err)
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id,
        {
          attributes: {
            exclude: ['updatedAt', 'createdAt']
          },
          include: [
            { model: Brand, attributes: ['name'] },
            { model: Category, attributes: ['name'] }
          ],
          raw: true,
          nest: true
        })
      if (product) {
        return res.json(product)
      } else {
        return res.status(404).json({ message: 'Product Not Found' })
      }
    } catch (err) {
      next(err)
    }
  }
}