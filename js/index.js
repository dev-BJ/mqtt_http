const express = require('express')
const http = require('http')
const app = express()

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the MQTT HTTP Bridge API',
  })
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})