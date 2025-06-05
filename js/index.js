const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the MQTT HTTP Bridge API',
  })
})

app.post('/mqtt', (req, res) => {
  console.log('Received MQTT message:', req.body ?? "No body provided")
  console.log('Payload', req.body.payload ?? "No payload provided")
  // console.log(`Received MQTT message for client ${clientId} on topic ${topic}: ${message}`)
  res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})