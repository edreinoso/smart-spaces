const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk')

const USER_TABLE = process.env.USER_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }))

app.get('/getRooms', function (req, res) {
  console.log(req.params)

  const params = {
    TableName: USER_TABLE,
    FilterExpression: 'username = :username',
    ExpressionAttributeValues: { ':username': req.params.username }
  }

  dynamoDB.scan(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not retrieve data' })
    } else {
      console.log(result)
      res.json(result)
    }
  })
})

app.post('/postRooms', function (req, res) {
  
})

module.exports.handler = serverless(app);