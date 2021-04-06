## 毛小孩商城
---
這是一個販賣寵物商品的電商網站
![](/screenshots/v1.png)

#### Demo Website
---
👉 Heroku: https://fan5-pet-shop.herokuapp.com/

請用下列資料測試
1. 會員登入:

| 信箱 | 密碼 |
| ------ | ------ |
| user1@seed.com | 123|
| user2@seed.com | 123|

2. 信用卡號: 4000-2211-1111-1111 (有效月年和背面末三碼可任意填寫)

#### 後端Demo
---
👉 Github: https://github.com/Fan-55/pet-shop-eCommerce-backend

👉 Heroku: https://pet-shop-api.herokuapp.com/api/products
#### Features
---
- 前端使用React框架
- 串接藍新金流
- 使用localstorage實作購物車功能
- RWD
- jwt authentication
- 後端RESTful API
- 後端API使用Node.js + Exresss.js + MySQL實作

#### Tools
---
 前端: 
- HTML
- CSS
- React
- Redux
- Bootstrap

後端:
- Node.js
- Express.js
- MySQL
- Sequelize

部署:
- Heroku

#### 待開發功能
---
- 後台  
1. 商品清單(上傳、編輯、刪除)
4. 使用者清單(編輯、刪除)
5. 訂單清單(編輯、刪除)

- 前台
1. 使用者編輯個人資料
2. 儲存使用者常用收件資料
3. 搜尋商品
4. 品牌分類
5. 評價系統
6. 商品分頁

#### Run Locally
---
1. Clone frontend repository
```
$ git clone https://github.com/Fan-55/pet-shop-eCommerce-backend.git
```
2. Go to the directory 
```
$ cd pet-shop-eCommerce-backend
```
3. Install the required packages 
```
$ npm install
```
4. Add `.env` file to root directory. 

5. Set the environment variables based on `.env.example` and copy them to `.env` file.

Following env variables are for payment feature. [check the NewebPay site for more details](https://www.newebpay.com/)
```
MerchantID=
HashKey=
HashIV=
ServerURL=
FrontEndURL=
```
6. Run the app in the development mode. 
```
$ npm run dev
```