if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()

app.listen(process.env.PORT, () => {
  console.log(`This app is running at http://localhost:${process.env.PORT}`)
})