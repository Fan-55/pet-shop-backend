module.exports = (input) => {
  switch (input) {
    case 'name':
      return '姓名'
    case 'password':
      return '密碼'
    case 'confirmPassword':
      return '確認密碼'
    case 'phone':
      return '電話'
    case 'address':
      return '地址'
    case 'recipient':
      return '收件人姓名'
    case 'deliveryMethod':
      return '運送方式'
    case 'paymentMethod':
      return '付款方式'
    default:
      return input
  }
}