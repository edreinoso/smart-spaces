const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk')

const PIR_TABLE = process.env.PIR_TABLE;
const USER_TABLE = process.env.USER_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }))

// app.get('/sensor/:floor', function (req, res) {
// app.get('/sensor/:items', function (req, res) {
app.post('/sensor', function (req, res) {
  // console.log(typeof(parseInt(req.params.floor)))
  // console.log('value of floor: ', typeof(req.params.floor))
  
  const { floor, rooms, favorites } = req.body // need to have the information from current rooms and favorites
  // const { floor, rooms, favorites } = req.params // need to have the information from current rooms and favorites
  console.log(req.body)
  
  // Trying to sort by floor
  const params = {
    TableName: PIR_TABLE,
    FilterExpression: 'floor = :floor',
    // ExpressionAttributeValues: { ':floor': parseInt(req.params.floor) } // number instead of string: testing variable
    ExpressionAttributeValues: { ':floor': floor } // string instead of number when reading data from SQS
  }
  // post will not affect the change, because dynamoDB is scanning only
  // it is not putting objects
  dynamoDB.scan(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not retrieve data' })
    } else {
      // Sorting array by date descending
      // console.log(result)
      result.Items.sort(function (a, b) {
        var dateA = new Date(a.timestamp), dateB = new Date(b.timestamp);
        return dateB - dateA;
      });

      // result sorted
      console.log('result sorted',result.Items)

      // Getting all unique room IDs
      // Very powerful function
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

      // getting the first items
      console.log('data', data)

      // Date Logic Calculation
      const today = new Date()
      const todayMinus5 = new Date()
      todayMinus5.setMinutes(today.getMinutes() - 5)
      data.map((item, index) => {
        let sensorData = new Date(item.timestamp)
        // Plain english logic: if the sensor data is greater than 5 minutes.
        // this means that the room is not available. 
        // if (sensorData > todayMinus5) item['availability'] = false
        console.log(sensorData, todayMinus5)
        if (sensorData < todayMinus5) {
          console.log('Room available rooms: ', typeof(rooms), 'favorites: ', typeof(favorites))
          // we are itering through both of the arrays that were given
          // from the req.body. Ideally, we would like change the item
          // property availability for the specific rooms / favorites 
  
          rooms.map((room_items, index) => {
            if (item.roomId == room_items.roomId) {
              room_items['availability'] = true
            }
          })
          favorites.map((favorites_item, index) => {
            if (item.roomId == favorites_item.roomId) {
              favorites_item['availability'] = true
            }
          })
        }
        else {
          console.log('Room not available')
          console.log('Room available rooms: ', typeof(rooms), 'favorites: ', typeof(favorites))
          // we are itering through both of the arrays that were given
          // from the req.body. Ideally, we would like change the item
          // property availability for the specific rooms / favorites 
  
          rooms.map((room_items, index) => {
            if (item.roomId == room_items.roomId) {
              room_items['availability'] = false
            }
          })
          favorites.map((favorites_item, index) => {
            if (item.roomId == favorites_item.roomId) {
              favorites_item['availability'] = false
            }
          })
        }
        // else item['availability'] = true
        console.log(item)
      })
      // res.json(data)
      res.send({rooms, favorites})
    }
  })
})

app.post('/users', function (req, res) {
  const { username, rooms, favorites } = req.body

  const params = {
    TableName: USER_TABLE,
    Item: {
      username: username,
      rooms: rooms,
      favorites: favorites
    }
  }

  dynamoDB.put(params, (error) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not post data' })
    } else {
      res.send({ username, rooms, favorites })
    }
  })
})

app.put('/users', function (req, res) {
  const { username, rooms, favorites } = req.body
  console.log('putting items', req.body) // rooms is the object that's being passed as empty
  // it has to be put for the specific floor !!
  const params = {
    TableName: USER_TABLE,
    Item: {
      username: username,
      // for some reason, this is not being put properly
      rooms: rooms, // this will have other value
      favorites: favorites // this will have some value
    }
  }

  dynamoDB.put(params, (error) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not post data' })
    } else {
      res.send({ username, rooms, favorites })
    }
  })
})

app.get('/users/:username', function (req, res) {
  // console.log(req.params)

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
      // console.log(result)
      var returnRooms = []
      var favRooms = []
      result.Items.map((item, index) => {
        returnRooms = item.rooms
        // returnRoomspush(item.rooms) // you are pushing the whole array, instead of indiv
        favRooms = item.favorites
        // favRooms.push(item.favorites)
        // getting by floor
        // item.rooms.map((item2, index) => {
        //   if (item2.floor == req.query.floor) {
        //     returnRooms.push(item2)
        //   }
        // })
        // item.favorites.map((item3, index) => {
        //   if (item3.floor == req.query.floor) {
        //     favRooms.push(item3)
        //   }
        // })
      })
      console.log(typeof (returnRooms), typeof (favRooms))
      console.log(returnRooms, favRooms)
      res.json({ returnRooms, favRooms })
    }
  })
})

module.exports.handler = serverless(app);