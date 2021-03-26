const { Order, OrderItem, Product } = require('../models/index')
const { checkEmptyFields } = require('../utils/validators')

module.exports = {
  createOrder: async (req, res, next) => {
    const { recipient, phone, address, deliveryMethod, paymentMethod, cartItems } = req.body

    if (!cartItems.length) {
      return res.status(400).json({ message: '請加入商品至購物車' })
    }

    const { isFieldEmpty, emptyFieldError } = checkEmptyFields({ recipient, phone, address, deliveryMethod, paymentMethod })
    if (isFieldEmpty) return res.status(400).json({ message: emptyFieldError })

    const delivery_fee = 80
    const subtotal = cartItems.reduce((a, c) => a + c.quantity * c.price, 0)

    try {
      const order = await Order.create({
        recipient,
        phone,
        address,
        delivery_method: deliveryMethod,
        payment_method: paymentMethod,
        UserId: req.user.id,
        delivery_fee,
        subtotal,
        total: delivery_fee + subtotal
      })

      const orderItems = cartItems.map(i => ({
        ProductId: i.id,
        quantity: i.quantity,
        OrderId: order.id,
        price: i.price
      }))

      const createdOrderItems = await OrderItem.bulkCreate(orderItems, { returning: true })

      return res.json(order)
    } catch (err) {
      next(err)
    }
  },
