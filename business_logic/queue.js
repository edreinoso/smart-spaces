// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
    // helloWorld = async (event) => {
    const ddb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
    for (const { messageAttributes } of event.Records) {
        console.log('messageAttributes:', messageAttributes);

        var params = {
            TableName: process.env.ROOM_TABLE,
            Item: {
                'id': messageAttributes.roomId.stringValue,
                // how is this going to relate to the other data
                // there might be an answer in future stages
                'sensorId': messageAttributes.sensorId.stringValue,
                'timestamp': messageAttributes.timestamp.stringValue,
                'roomName': messageAttributes.roomName.stringValue,
                'floor': messageAttributes.floor.stringValue,
                'section': messageAttributes.section.stringValue,
            }
        };
        await ddb.put(params).promise()
    }
    return `Successfully processed ${event.Records.length} messages.`;
};
