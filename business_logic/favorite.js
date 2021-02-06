const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk')

const ROOM_TABLE = process.env.ROOM_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();