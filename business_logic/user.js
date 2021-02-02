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

app.put('/changeUserPass', function (req, res){
// app.put('/changeUserPass/:username', function (req, res){
  console.log('/changeUserPass method')
  const { username, password } = req.body
  
  var params = {
    TableName: USER_TABLE,
    Key: {
      "username": username,
    },
    UpdateExpression: "set password = :p",
    ExpressionAttributeValues: {
      ":p": password,
    },
    ReturnValues: "UPDATED_NEW"
  };

  console.log("Updating the item...");
  dynamoDB.update(params, function (err, data) {
    if (err) {
      console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      res.send(err)
    } else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      res.send(data)
    }
  });

})

app.post('/postUsers', function (req, res) {
  console.log('/postUsers method')
  
  // const { username, firstName, lastName, mobileToken, favoriteRooms } = req.body
  const { username, password } = req.body
  req.body.favoriteRooms = []
  console.log(req.body)

  const params = {
    TableName: USER_TABLE,
    Item: {
      username: username,
      password: password,
      favoriteRooms: req.body.favoriteRooms, 
      // when the user actually has a token to send
      // this might be particularly important when
      // re-developing the notifiaction portion
      // mobileToken: availability

      // a very specific modification will have to
      // be made in the application to add first
      // and last names
      // firstName: floor,
      // lastName: section,
    }
  }

  dynamoDB.put(params, (error) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: `Could not post data into the ${USER_TABLE}` })
    } else {
      res.send({ username, password })
      // res.send({ id, name, floor, section, availability })
    }
  })
})

module.exports.handler = serverless(app);