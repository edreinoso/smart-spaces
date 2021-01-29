const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk')

const USER_TABLE = process.env.USER_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }))

app.get('/getUsers', function (req, res) {
  // this is where the code to get all users
})

app.get('/getUserById/:username', function (req, res) {
  // this is to get the user by a specific email id
})

app.post('/postUsers', function (req, res) {
  // favoriteRooms is going to be an array of strings
  // const { username, firstName, lastName, mobileToken, favoriteRooms } = req.body
  const { username, password } = req.body
  req.body.favoriteslRooms = []
  console.log(req.body)

  const params = {
    TableName: USER_TABLE,
    Item: {
      username: username,
      password: password,
      // favoriteRooms: req.body.favoriteRooms, // maybe this is not properly rendering
      // firstName: floor,
      // lastName: section,
      // mobileToken: availability
    }
  }

  dynamoDB.put(params, (error) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: `Could not post data into the ${USER_TABLE}` })
    } else {
      res.send({ username, password })s
      // res.send({ id, name, floor, section, availability })
    }
  })
})

module.exports.handler = serverless(app);