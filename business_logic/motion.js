const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk')

const TABLE = process.env.PIR_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }))

app.get('/sensor/:floor', function (req, res) {
  // console.log('Is it working?', req.params.floor)
  // console.log(typeof(parseInt(req.params.floor)))
  // Trying to sort by floor
  console.log('value of floor: ', typeof(req.params.floor))
  const params = {
    TableName: TABLE,
    FilterExpression: 'floor = :floor',
    // ExpressionAttributeValues: { ':floor': parseInt(req.params.floor) } // testing variable
    ExpressionAttributeValues: { ':floor': req.params.floor } // when reading data from SQS
  }
  dynamoDB.scan(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Cloud not retrieve data' })
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

module.exports.handler = serverless(app);