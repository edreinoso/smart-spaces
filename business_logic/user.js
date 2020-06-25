const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const app = express()

// const cognito = new AWS.

app.user(bodyParser.json({ strict: false }));

app.get('/user/:userId', function (req, res) {

})

app.post('/user/', function (req, res) {

})