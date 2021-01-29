const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk')

const ROOM_TABLE = process.env.ROOM_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }))

app.get('/getRooms', function (req, res) {
  // this is where the code to get rooms will be
})

app.post('/postRooms', function (req, res) {
  // this is where the code to post rooms will be

  // at this point, the post is only happening request by request
  // it is not handling array variables to be sent
  const { id, name, floor, section, availability } = req.body

  const params = {
    TableName: ROOM_TABLE,
    Item: {
      id: id,
      name: name,
      floor: floor,
      section: section,
      availability: availability
    }
  }

  dynamoDB.put(params, (error) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: `Could not post data into the ${ROOM_TABLE}` })
    } else {
      res.send({ id, name, floor, section, availability })
    }
  })
})

module.exports.handler = serverless(app);