// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

async function helloWorld (imageType, availability) {
    console.log('calling an exterior function')
    var params = {
        TableName: process.env.ROOM_TABLE,
        Key: {
            "id": imageType
            // "id": dynamodb.NewImage.roomId.S
        },
        UpdateExpression: "set availability=:a",
        ExpressionAttributeValues: {
            ":a": availability
        },
        ReturnValues: "UPDATED_NEW"
    }
    console.log(params)
    await ddb.update(params).promise().then(res =>{
        console.log(res)
    }).catch(err => {
        console.log(err)
    });
}


module.exports.handler = async (event) => {
    console.log(JSON.stringify(event, null, 2));
    for (const { eventID, eventName, dynamodb } of event.Records) {
        helloWorld()
        console.log(eventID)
        console.log(eventName)
        console.log(dynamodb)

        if (eventName === "INSERT") {
            console.log('inserting new image:', dynamodb.NewImage.roomId.S);
            await helloWorld(dynamodb.NewImage.roomId.S, false)
        } else if (eventName === "REMOVE") {
            console.log('removing old image:', dynamodb.OldImage.roomId.S);
            await helloWorld(dynamodb.OldImage.roomId.S, true)
        }
    }
    return `Successfully processed Stream`;
};