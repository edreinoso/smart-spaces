// Load the AWS SDK for Node.js
// AWAIT function is giving some issues when it comes to scan the DDB
const AWS = require('aws-sdk');
const fetch = require('node-fetch');

module.exports.handler = async (event) => {
    // initializing 
    const ddb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
    var usersData = [];
    var sensorData = [];
    const today = new Date();
    const todayMinus5 = new Date();
    todayMinus5.setMinutes(today.getMinutes() - 5);

    // getting the information from the user table
    var paramsUserData = {
        TableName: "User-table",
    };
    await ddb.scan(paramsUserData, function (err, data) {
        if (err) console.log(err);
        else {
            // console.log(data.Items);
            usersData = data.Items; // it is not getting declared unless async
        }
    }).promise(); // need to have the promise here to handle the async request

    // getting the information from the sensor table
    var paramsSensorData = {
        TableName: "PIR-table",
    };
    await ddb.scan(paramsSensorData, function (err, data) {
        if (err) console.log(err);
        else {
            // console.log(data.Items);
            sensorData = data.Items;
        }
    }).promise(); // need to have the promise here to handle the async request

    // sorting the data from the sensor table
    sensorData.sort(function (a, b) {
        var dateA = new Date(a.timestamp), dateB = new Date(b.timestamp);
        return dateB - dateA;
    });

    // getting the unique items by the roomId
    const data = Array.from(new Set(sensorData.map(s => s.roomId)))
        .map(roomId => {
            return {
                roomId: roomId,
                id: sensorData.find(s => s.roomId === roomId).id,
                roomName: sensorData.find(s => s.roomId === roomId).roomName,
                floor: sensorData.find(s => s.roomId === roomId).floor,
                ttl: sensorData.find(s => s.roomId === roomId).ttl,
                timestamp: sensorData.find(s => s.roomId === roomId).timestamp
            };
        });

    console.log('line 57- sensorData:', data)

    data.map((item, index) => {
        let sensorData = new Date(item.timestamp);
        console.log('roomId: ', item.roomId, 'timestamp:', item.timestamp);
        // this is going to check whether rooms are available
        console.log('sensorData < todayMinus5: ', sensorData < todayMinus5, 'sensorData: ', sensorData, 'todayMinus5:', todayMinus5);
        if (sensorData < todayMinus5) {
            usersData.map((userItem, index) => {
                // room
                // favorites -- such case is not even considered
                userItem.rooms.map((roomItem, index) => {
                    // this is going to check:
                    // a) whether a certain room has been starred by the user
                    // b) whether the the roomItem.roomId is equal to the item.roomId
                    console.log('roomItem.name', roomItem.roomName, 'roomItem.notifications', roomItem.notifications, 'roomItem.roomId', roomItem.roomId, 'item.roomId', item.roomId)
                    if (roomItem.notifications && roomItem.roomId == item.roomId) {
                        // send notification
                        console.log('send notifiaction for room:', roomItem.roomName)
                        let response = fetch('https://exp.host/--/api/v2/push/send', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                to: 'ExponentPushToken[iJokGCEYtEcHKnB52OqCS6]',
                                sound: 'default',
                                title: 'Demo',
                                body: `Hello, ${roomItem.roomName} is available for use`
                            })
                        })
                    }
                });
            });
        } else {
            console.log('room: ', item.roomName, ' is not available');
        }
    });
};