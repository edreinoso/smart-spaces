const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk')

const ROOM_TABLE = process.env.ROOM_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }))

app.get('/getRooms/:floor', function (req, res) { // for now
// app.get('/getRooms, function (req, res) {
  // this is where the code to get rooms will be
  
  console.log('hello world', req.params.floor)

  // would probably get rooms on by flooring
  // there are advantages and disadvantages with this approach
  // advantage would be to have recent data
  // disadvantage would be networking computation
  const params = {
    TableName: ROOM_TABLE,
    FilterExpression: 'floor = :floor',
    ExpressionAttributeValues: { ':floor': req.params.floor }
  }

  var aRooms = []
  var uRooms = []

  dynamoDB.scan(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: `Could not get rooms from ${floor} in the ${ROOM_TABLE}`})
    } else {
      console.log(result)

      //creating 
      result.Items.map((item, index) => {
        console.log(item, item.availability)
        if (item.availability) aRooms.push(item)
        else uRooms.push(item)
      })
      console.log('final result:',aRooms, uRooms)
      res.send({ aRooms, uRooms })
    }
  })
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