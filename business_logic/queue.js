// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
// helloWorld = async (event) => {
    const ddb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
    for (const { messageAttributes } of event.Records) {
        console.log('messageAttributes:', messageAttributes);
        var params = {
            TableName: process.env.SENSOR_TABLE,
            Item: {
                'id': messageAttributes.id.stringValue,
                // how is this going to relate to the other data
                // there might be an answer in future stages
                // 'sensorId': messageAttributes.sensorId.stringValue,
                'roomId': messageAttributes.roomId.stringValue,
                'timestamp': messageAttributes.timestamp.stringValue,
                'floor': messageAttributes.floor.stringValue,
                'ttl': messageAttributes.ttl.stringValue,
            }
        };
        await ddb.put(params).promise()
    }
    // just as FYI for future references and debugging
    return `Successfully processed ${event.Records.length} messages.`;
};

// module.exports.handler = helloWorld()