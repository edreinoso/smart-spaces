// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

async function helloWorld (imageType, availability, ddb) {
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
    await ddb.update(params).promise(); // there's gonna be an inconvenience here
}


module.exports.handler = async (event) => {
    const ddb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
    console.log(JSON.stringify(event, null, 2));
    for (const { eventID, eventName, dynamodb } of event.Records) {
        helloWorld()
        console.log(eventID)
        console.log(eventName)
        console.log(dynamodb)

        if (eventName === "INSERT") {
            console.log('inserting new image:', dynamodb.NewImage.roomId.S);
            helloWorld(dynamodb.NewImage.roomId.S, false, ddb)
        } else if (eventName === "REMOVE") {
            console.log('removing old image:', dynamodb.OldImage.roomId.S);
            helloWorld(dynamodb.OldImage.roomId.S, true, ddb)
        }
    }
    return `Successfully processed Stream`;
};