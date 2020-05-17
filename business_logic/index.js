const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk')

const TABLE = process.env.PIR_TABLE;
const dynamodDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/sensor/:id', function (req, res) {
  console.log(req.params)
  const params = {
    TableName: TABLE,
    Key: {
      id: req.params.id
    }
  }

  dynamodDB.get(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Cloud not retrieve data' })
    } else if (result.Item) {
      // const { id, roomId, roomName } = result.Item
      console.log(result.Item)
      res.json(result.Item);
    } else {
      res.status(404).json({ error: "Something else happened" })
    }
  })
})

app.get('/sensor', function (req, res) {
  console.log(req.params)
  const params = {
    TableName: TABLE,
    Key: {
      id: req.params.id
    }
  }
  var response = {
    "Items": [],
    "List": false
  }
  var phoneRoom = []
  var roomIdHolder = ""

  dynamodDB.scan(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Cloud not retrieve data' })
    } else {
      console.log(result.Items)
      result.Items.map((item, index) => {
        if (item.roomId != roomIdHolder){ 
          console.log(item.roomId)
          phoneRoom.push(item)
          roomIdHolder = item.roomId
        }
      })
      
      // let maxPeak = result.Items.reduce((p, c) => p.ttl > c.ttl ? p : c); // object
      // response['Items'].push(maxPeak)
      
      // // Date Logic Calculation
      // const today = new Date()
      // // date for comparison whether sensor has 
      // // sensed something in the past X minutes      
      // const todayMinus5 = new Date()
      // todayMinus5.setMinutes(today.getMinutes() - 2)
      // // console.log('todayMinus5: ', todayMinus5, ' maxPeakTime: ', maxPeak.timestamp)
      // let sensorData = new Date(maxPeak.timestamp)
      // // console.log('sensorData: ',sensorData)
      // if (sensorData > todayMinus5) {
      //   // need to append a value to  
      //   console.log('Hello')
      //   response['List'] = true
      //   // active = true
      // }
      console.log(phoneRoom)
      res.json(phoneRoom)
      // res.json(result)
    }
  })
})

module.exports.handler = serverless(app);