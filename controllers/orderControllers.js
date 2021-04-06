const { Order, OrderItem, Product } = require('../models/index')
const { checkEmptyFields } = require('../utils/validators')
const { getTradeInfo, create_mpg_aes_decrypt } = require('../utils/tradeInfo')

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
  getOrder: async (req, res, next) => {
    const orderId = req.params.id
    try {
      const order = await Order.findByPk(orderId, {
        include: [{
          model: OrderItem,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'price', 'image'],
            }
          ]
        }]
      })
      if (order && order.UserId !== req.user.id) {
        return res.status(400).json({ message: 'Not allowed to access' })
      }
      if (!order) {
        return res.status(404).json({ message: 'Order Not Found' })
      }
      if (!order.payment_status) {
        const Amt = order.total
        const Desc = `${req.user.name}的訂單`
        const email = req.user.email
        const tradeInfo = getTradeInfo(Amt, Desc, email, orderId)
        order.sn = tradeInfo.MerchantOrderNo
        await order.save()
        return res.json({ orderContent: order, tradeInfo })
      } else {
        return res.json({ orderContent: order, tradeInfo: null })
      }
    } catch (err) {
      next(err)
    }
  },
  newebpayCallback: async (req, res, next) => {
    console.log('===== spgatewayCallback =====')
    console.log(req.method)
    console.log(req.url)
    console.log(req.query)
    console.log(req.body)
    console.log('===== spgatewayCallback: TradeInfo =====')
    console.log(req.body.TradeInfo)
    const data = JSON.parse(create_mpg_aes_decrypt(req.body.TradeInfo))
    console.log('===== spgatewayCallback: create_mpg_aes_decrypt、data =====')
    console.log(data)

    if (req.query.from === 'NotifyURL') {
      return res.status(200).json({ message: 'POST /api/newebpay/callback for NotifyURL triggered' })
    }

    if (req.query.from === 'ReturnURL') {
      try {
        const order = await Order.findOne({ where: { sn: data.Result.MerchantOrderNo } })
        if (data.Status === 'SUCCESS') {
          order.payment_status = true
          order.paid_at = Date.now()
          await order.save()
        }
        return res.redirect(`${process.env.FrontEndURL}/orders/${order.id}`)
      } catch (err) {
        next(err)
      }
    }
  },
  getOrders: async (req, res, next) => {
    try {
      const orders = await Order.findAll({
        where: { UserId: req.user.id },
        include: [{
          model: OrderItem,
          include: [{ model: Product }]
        }],
        order: [['createdAt', 'DESC']]
      })
      return res.json(orders)
    } catch (err) {
      next(err)
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
      const order = await Order.findByPk(req.params.id)
      if (order && order.UserId !== req.user.id) {
        return res.status(400).json({ message: 'Order cancellation is not allowed by current user' })
      }
      if (!order) {
        return res.status(404).json({ message: 'Order Not Found' })
      }
      if (order.payment_status) {
        return res.status(400).json({ message: '不能取消已付款的訂單' })
      }
      await order.destroy()
      return res.json({ message: '成功刪除' })
    } catch (err) {
      next(err)
    }
  },
}