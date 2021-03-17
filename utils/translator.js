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
    default:
      return input
  }
}