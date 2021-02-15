const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk')

const ROOM_TABLE = process.env.ROOM_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }))

app.get('/getRooms/:floor', function (req, res) { // for now
  const today = new Date()
  const todayMinus5 = new Date()
  todayMinus5.setMinutes(today.getMinutes() - 5)

  const params = {
    TableName: ROOM_TABLE,
    FilterExpression: 'floor = :floor',
    ExpressionAttributeValues: { ':floor': req.params.floor }
  }

  var aRooms = []
  var uRooms = []

  console.log('current time: ', today, ' today minus 5 minutes: ', todayMinus5)

  dynamoDB.scan(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: `Could not get rooms from ${floor} in the ${ROOM_TABLE}` })
    } else {
      console.log(result)

      //creating 
      result.Items.map((item, index) => {
        const sensorTime = new Date(item.timestamp)
        console.log('sensorTime > todayMinus5: ', sensorTime > todayMinus5)
        if (sensorTime > todayMinus5) {
          item.availability = false
          uRooms.push(item)
        }
        else {
          item.availability = true
          aRooms.push(item)
        }
      })
      console.log('final result:', aRooms, uRooms)
      res.send({ aRooms, uRooms })
    }
  })
})

module.exports.handler = serverless(app);