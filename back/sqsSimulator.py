import boto3
import random
import string
import time
from datetime import datetime
from datetime import timedelta
from dateutil.tz import *

# variable generators
room_name_array = ["Ed's Room", "Kairis' Room",
                   "Luisana's Room", "Darlyn's Room"]
room = [{"roomName": "Ed's Room", "roomId": "1", "floor": "1"}, {"roomName": "Kairis' Room", "roomId": "2", "floor": "1"}, {
    "roomName": "Luisana's Room", "roomId": "3", "floor": "2"}, {"roomName": "Darlyn's Room", "roomId": "4", "floor": "3"}]

tomorrow = datetime.now(tzutc()) + timedelta(minutes=15)
expires = int(tomorrow.strftime('%s'))

client = boto3.client('sqs')
# queueUrl = "https://sqs.us-east-1.amazonaws.com/130193131803/myfirstqueue"
# queueUrl = "https://sqs.us-east-1.amazonaws.com/130193131803/PIR_sensor_data"
queueUrl = "	https://sqs.us-east-1.amazonaws.com/130193131803/PIR-queue"
randomVariable = ""
currentTime = ""
now = ""

for x in range(10):  # this is going to run only 10 times
    # while True:  # this is going to run forever
    randomNum = random.randrange(4)
    randomVariable = ''.join(
        [random.choice(string.ascii_letters + string.digits) for n in range(10)])
    currentTime = datetime.utcnow()
    print('id: ' + randomVariable + ' roomName: ' +
          room[randomNum]['roomName'] + ' roomId: ' + str(room[randomNum]['roomId']) + ' floor: ' + str(room[randomNum]['floor']) + ' time: ' + str(currentTime))

    # print(type(room[randomNum]['roomId']))
    # print(type(room[randomNum]['floor']))
    # SQS send command

    response = client.send_message(
        QueueUrl=queueUrl,
        MessageBody="Sensor data coming to the queue",
        MessageAttributes= {
            'id': {
                'StringValue': randomVariable,
                'DataType': 'String'
            },
            'roomName': {
                'StringValue': room[randomNum]["roomName"],
                'DataType': 'String'
            },
            'timestamp':  {
                'StringValue': str(currentTime.strftime("%Y-%m-%dT%H:%M:%SZ")),
                'DataType': 'String'
            },
            'roomId': {
                'StringValue': room[randomNum]["roomId"],
                'DataType': 'String'
            },
            'floor': {
                'StringValue': room[randomNum]["floor"],
                'DataType': 'String'
            },
            'ttl': {
                'StringValue': str(expires)},
                'DataType': 'Number'
            }
        }
    )

    time.sleep(5)
