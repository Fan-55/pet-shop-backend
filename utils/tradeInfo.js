const crypto = require('crypto')

const MerchantID = process.env.MerchantID
const HashKey = process.env.HashKey
const HashIV = process.env.HashIV
const PayGateWay = 'https://ccore.newebpay.com/MPG/mpg_gateway'
const ServerURL = 'https://f8dba915b190.ngrok.io'
const ReturnURL = ServerURL + '/api/newebpay/callback?from=ReturnURL'
const NotifyURL = ServerURL + '/api/newebpay/callback?from=NotifyURL'
const FrontEndURL = 'http://localhost:3000'

function genDataChain(TradeInfo) {
  let results = []
  for (let kv of Object.entries(TradeInfo)) {
    results.push(`${kv[0]}=${kv[1]}`)
  }
  return results.join('&')
}

function create_mpg_aes_decrypt(TradeInfo) {
  let decrypt = crypto.createDecipheriv('aes256', HashKey, HashIV)
  decrypt.setAutoPadding(false)
  let text = decrypt.update(TradeInfo, 'hex', 'utf8')
  let plainText = text + decrypt.final('utf8')
  let result = plainText.replace(/[\x00-\x20]+/g, '')
  return result
}

function create_mpg_aes_encrypt(TradeInfo) {
  let encrypt = crypto.createCipheriv('aes256', HashKey, HashIV)
  let enc = encrypt.update(genDataChain(TradeInfo), 'utf8', 'hex')
  return enc + encrypt.final('hex')
}

function create_mpg_sha_encrypt(TradeInfo) {
  let sha = crypto.createHash('sha256')
  let plainText = `HashKey=${HashKey}&${TradeInfo}&HashIV=${HashIV}`
  return sha.update(plainText).digest('hex').toUpperCase()
}

/* 必填參數
  1. MerchantID
  2. RespondType
  3. TimeStamp
  4. Version
  5. MerchantOrderNo
  6. Amt
  7. ItemDesc
  8. Email
  9. LoginType
*/

function getTradeInfo(Amt, Desc, email, orderId) {
  console.log('===== getTradeInfo =====')
  console.log(Amt, Desc, email, orderId)
  console.log('==========')

  const data = {
    MerchantID: MerchantID, // 1.商店代號
    RespondType: 'JSON', // 2.回傳格式
    TimeStamp: Date.now(), // 3.時間戳記
    Version: 1.5, // 4.串接程式版本
    MerchantOrderNo: Date.now(), // 5.商店訂單編號
    Amt: Amt, // 6.訂單金額
    ItemDesc: Desc, // 7.產品名稱
    Email: email, // 8.付款人電子信箱
    LoginType: 0, // 9.智付通會員
    ReturnURL: ReturnURL, // 支付完成返回商店網址
    NotifyURL: NotifyURL, // 支付通知網址/每期授權結果通知
    ClientBackURL: FrontEndURL + `/orders/${orderId}`, // 支付取消返回商店網址
  }

  console.log('===== getTradeInfo: data =====')
  console.log(data)

  mpg_aes_encrypt = create_mpg_aes_encrypt(data)
  mpg_sha_encrypt = create_mpg_sha_encrypt(mpg_aes_encrypt)

  console.log('===== getTradeInfo: mpg_aes_encrypt, mpg_sha_encrypt =====')
  console.log(mpg_aes_encrypt)
  console.log(mpg_sha_encrypt)

  const tradeInfo = {
    MerchantID: MerchantID,
    TradeInfo: mpg_aes_encrypt,
    TradeSha: mpg_sha_encrypt,
    Version: 1.5,
    PayGateWay: PayGateWay,
    MerchantOrderNo: data.MerchantOrderNo,
  }

  console.log('===== getTradeInfo: tradeInfo =====')
  console.log(tradeInfo)

  return tradeInfo
}

exports.getTradeInfo = getTradeInfo
exports.create_mpg_aes_decrypt = create_mpg_aes_decrypt