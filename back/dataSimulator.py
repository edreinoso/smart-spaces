import boto3
import random
import string
import time
from datetime import datetime

# table_name = "PIR-sensor-2"
table_name = "PIR-sensor"

room_name_array = ["Ed's Room", "Kairis' Room",
                   "Luisana's Room", "Darlyn's Room"]
room=[{"roomName": "Ed's Room", "roomId": 1}, {"roomName": "Kairis' Room", "roomId": 2}, {"roomName": "Luisana's Room", "roomId": 3}, {"roomName": "Darlyn's Room", "roomId": 4}]

client_ddb = boto3.resource('dynamodb')
ddb_table = client_ddb.Table(table_name)
randomVariable = ""
currentTime = ""
# now = datetime.utcnow()
# print(str(now.strftime("%Y-%m-%dT%H:%M:%SZ")))
# print(str(now))
now = ""

# x = 1
while True:
    # print("To infinity and beyond! We're getting close, on %d now!" % (x))
    # x += 1
    randomNum = random.randrange(4)
    # print(random.randrange(4))
    randomVariable = ''.join(
        [random.choice(string.ascii_letters + string.digits) for n in range(10)])
    currentTime = datetime.utcnow()
    now = datetime.utcnow()
    ttl_number = int(now.strftime('%s'))
    print('values sent to dynamodb: id: ' + randomVariable +
          ' roomName: ' + room[randomNum]['roomName'] + ' roomId: ' + str(room[randomNum]['roomId']) + ' time: ' + str(currentTime))
    ddb_table.put_item(
        Item={
            'id': randomVariable,
            'roomName': room[randomNum]['roomName'],
            'roomId': room[randomNum]['roomId'],
            'floor': 1,
            'timestamp':  str(currentTime.strftime("%Y-%m-%dT%H:%M:%SZ")),
            'ttl': int(now.strftime('%s')),
        }
    )
    time.sleep(5)
