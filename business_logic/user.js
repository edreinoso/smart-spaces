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

app.put('/changeUserPass/:username', function (req, res){
  const params = {
    TableName: USER_TABLE,
    FilterExpression: 'username = :username',
    ExpressionAttributeValues: { ':username': req.params.username }
  }

  var params = {
    TableName: table,
    Key: {
      "year": year,
      "title": title
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues: {
      ":r": 5.5,
      ":p": "Everything happens all at once.",
      ":a": ["Larry", "Moe", "Curly"]
    },
    ReturnValues: "UPDATED_NEW"
  };

  console.log("Updating the item...");
  docClient.update(params, function (err, data) {
    if (err) {
      console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      res.send(data)
      // res.send(JSON.stringify(data, null, 2))
    }
  });

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
      res.send({ username, password })
      // res.send({ id, name, floor, section, availability })
    }
  })
})

module.exports.handler = serverless(app);