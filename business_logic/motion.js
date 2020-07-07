const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk')

const PIR_TABLE = process.env.PIR_TABLE;
const PHONE_ROOM_TABLE = process.env.PHONE_ROOM_TABLE;
const FAVORITE_TABLE = process.env.FAVORITE_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }))

app.get('/sensor/:floor', function (req, res) {
  // console.log(typeof(parseInt(req.params.floor)))
  // console.log('value of floor: ', typeof(req.params.floor))
  console.log('value of floor: ', req.params.floor)
  // Trying to sort by floor
  const params = {
    TableName: PIR_TABLE,
    FilterExpression: 'floor = :floor',
    // ExpressionAttributeValues: { ':floor': parseInt(req.params.floor) } // number instead of string: testing variable
    ExpressionAttributeValues: { ':floor': req.params.floor } // string instead of number when reading data from SQS
  }
  dynamoDB.scan(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not retrieve data' })
    } else {
      // Sorting array by date descending
      console.log(result)
      result.Items.sort(function (a, b) {
        var dateA = new Date(a.timestamp), dateB = new Date(b.timestamp);
        return dateB - dateA;
      });

      // Getting all unique room IDs
      const data = Array.from(new Set(result.Items.map(s => s.roomId)))
        .map(roomId => {
          return {
            roomId: roomId,
            id: result.Items.find(s => s.roomId === roomId).id,
            roomName: result.Items.find(s => s.roomId === roomId).roomName,
            floor: result.Items.find(s => s.roomId === roomId).floor,
            ttl: result.Items.find(s => s.roomId === roomId).ttl,
            timestamp: result.Items.find(s => s.roomId === roomId).timestamp
          }
        })

      // // Date Logic Calculation
      const today = new Date()
      // date for comparison whether sensor has 
      // sensed something in the past X minutes      
      const todayMinus5 = new Date()
      todayMinus5.setMinutes(today.getMinutes() - 2)
      // console.log('today: ', today, 'todayMinus5: ', todayMinus5)
      data.map((item, index) => {
        // console.log(item)
        let sensorData = new Date(item.timestamp)
        // console.log(sensorData)
        // Plain english logic: if the sensor data is greater than 5 minutes.
        // this means that the room is not available. 
        if (sensorData > todayMinus5) item['availability'] = false
        else item['availability'] = true
        console.log(item)
      })
      res.json(data)
    }
  })
})

app.get('/phonerooms/:floor', function (req, res) {
  // app.get('/phonerooms', function (req, res) {
  const params = {
    TableName: PHONE_ROOM_TABLE,
    FilterExpression: 'floor = :floor',
    ExpressionAttributeValues: { ':floor': req.params.floor }
  }
  // dynamoDB.get needs to have a key. GET request requiring a Key to proceed
  dynamoDB.scan(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not retrieve data' })
    } else {
      console.log(result.Items) // result.Item is undefined
      res.json(result.Items)
    }
  })
})

app.get('/favorites', function (req, res) {
  const params = {
    TableName: FAVORITE_TABLE
  }
  dynamoDB.scan(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not retrieve data' })
    } else {
      console.log(result.Items) // result.Item is undefined
      res.json(result.Items)
    }
  })
})

app.post('/favorites', function (req, res) {
  const { username, roomName, roomId, availability, timestamp, favorite } = req.body
  console.log(req)

  const params = {
    TableName: FAVORITE_TABLE,
    Item: {
      roomId: roomId,
      username: username,
      roomName: roomName,
      availability: availability,
      timestamp: timestamp,
      favorite: favorite
    },
  }

  dynamoDB.put(params, (error) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not post data' })
    } else {
      res.send({ username, roomName, roomId, availability, timestamp, favorite })
    }
  })
})

// app.delete('/favorites/:username/:roomId', function (req, res) {
app.delete('/favorites', function (req, res) {
  console.log(req.body)

  // const { username, roomName, roomId, availability, timestamp, favorite } = req.body
  const { username, roomId } = req.body

  const params = {
    TableName: FAVORITE_TABLE,
    Key: {
      "roomId": roomId,
    },
    ConditionExpression: "username <= :val",
    ExpressionAttributeValues: {
      ":val": username
    }
  }

  dynamoDB.delete(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not delete data' })
    } else {
      console.log('response: ', result)
      res.json(result)
    }
  })
})

module.exports.handler = serverless(app);