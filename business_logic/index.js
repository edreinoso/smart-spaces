const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk')

const TABLE = process.env.PIR_TABLE;
const HARD_CODE_TABLE = 'PIR-sensor-2';
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
      // Sorting array by date descending
      result.Items.sort(function (a, b) {
        var dateA = new Date(a.timestamp), dateB = new Date(b.timestamp);
        return dateB - dateA;
      });

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
      console.log('today: ',  today,'todayMinus5: ', todayMinus5)
      data.map((item, index) => {
        // console.log(item)
        let sensorData = new Date(item.timestamp)
        // console.log(sensorData)
        if (sensorData > todayMinus5) item['list'] = true
        else item['list'] = false
        console.log(item)
      })
      // let sensorData = new Date(maxPeak.timestamp)
      // console.log('sensorData: ',sensorData)
      // if (sensorData > todayMinus5) {
      //   // need to append a value to  
      //   console.log('Hello')
      //   response['List'] = true
      // }
      // console.log(data)
      res.json(data)
      // console.log(result.Items)
      // res.json(result.Items)
    }
  })
})

module.exports.handler = serverless(app);