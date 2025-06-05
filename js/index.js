const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the MQTT HTTP Bridge API',
  })
})

app.post('/mqtt/:cliend_id', (req, res) => {
  const clientId = req.params.client_id
  const topic = req.query.topic
  const message = req.query.message
  console.log(`Received MQTT message for client ${clientId} on topic ${topic}: ${message}`)
  res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})