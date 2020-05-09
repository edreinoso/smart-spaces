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

  dynamodDB.scan(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Cloud not retrieve data' })
    } else {
      // const { id, roomId, roomName } = result.Item
      // console.log(result)
      console.log('hello world!!')
      res.json(result);
    }
  })
})

module.exports.handler = serverless(app);