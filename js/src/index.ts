import express, {Request, Response} from 'express'
import db from '../db'
import { device_state, payload } from '../db/schema'
import type {DeviceStateInsertSchema, PayloadInsertSchema} from '../db/schema'
import { eq } from 'drizzle-orm'

const test_db = db.execute('SELECT 1')
try {
  test_db.then(() => {
    console.log('Database connection successful')
  }).catch((error) => {
    console.error('Database connection failed:', error)
  })
}catch(err){
  console.log("Database Error:", err);
}

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the MQTT HTTP Bridge API',
  })
})

type RequestBodyType = {
  [key: string]: any; // Allows assigning null or any value to properties
}

type DeviceState = DeviceStateInsertSchema & PayloadInsertSchema

const update_device_connection = (device_state: any, body: any, res: Response)=>{
  const check_if_client_exists = db.select({client_id: device_state.clientId}).from(device_state).where(eq(device_state.clientId, body.clientid))

  check_if_client_exists.then((result) => {
    console.log("Result Log:", result);
    if (result.length > 0) {
      // Device exists, update the state
      db.update(device_state).set({
        event: body.event,
        time: new Date(body.time),
        reason: body.reason,
        peername: body.peername,
        peerhost: body.peerhost,
      }).where(eq(device_state.clientId, body.clientid)).then(() => {
        console.log('Device state updated successfully')
      }).catch((error) => {
        console.error('Error updating device state:', error)
        res.sendStatus(500)
      })
    } else {
      // Device does not exist, insert a new record
      db.insert(device_state).values({
        clientId: body.clientid,
        username: body.username,
        topic: body.topic,
        event: body.event,
        time: new Date(body.time),
        reason: body.reason || null,
        peername: body.peername || null,
        peerhost: body.peerhost || null,
      }).then(() => {
        console.log('Device state inserted successfully')
      }).catch((error) => {
        console.error('Error inserting device state:', error)
        res.sendStatus(500);
      })
    }
  }).catch((error) => {
    console.error('Error checking if client exists:', error)
    res.sendStatus(500)
  })
}

const update_payload = (payload: any, body: any, res: Response) => {
  db.insert(payload).values({
      clientId: body.clientid,
      topic: body.topic,
      payload: body.payload,
      time: new Date(body.time),
    }).then(() => {
      console.log('MQTT message saved successfully')
      res.sendStatus(200)
    }).catch((error) => {
      console.error('Error saving MQTT message:', error)
      res.sendStatus(500)
    })
  }

app.post('/mqtt', (req: Request, res: Response) => {

  if(req.body && typeof req.body === 'object') {
    // console.log('Received MQTT message:', req.body)
    const body: RequestBodyType = req.body
    for (const key in body) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        const typedKey = key as keyof RequestBodyType;
        if (body[typedKey] === "undefined") {
          // console.log(`Key ${typedKey} is undefined`);
          body[typedKey] = null; // or handle it as needed
        }
      }
    }

    if(body.event === "client_connected" || body.event === "client_disconnected") {
      update_device_connection(device_state, body, res)
    }else if(body.event === "message_publish") {
      update_payload(payload, body, res)
    }else{
      console.log('Unknown event type:', body.event)
      res.status(400).send('Unknown event type')
    }
    res.sendStatus(200)
  }
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})