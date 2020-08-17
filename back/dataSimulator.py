import boto3
import random
import string
import time
from datetime import datetime

# table_name = "PIR-sensor-2"
table_name = "PIR-table"

room_name_array = ["Ed's Room", "Kairis' Room",
                   "Luisana's Room", "Darlyn's Room"]
room = [{"roomName": "Ed's Room", "roomId": "4", "floor": "1"}, {"roomName": "Kairis' Room", "roomId": "2", "floor": "1"}, {
    "roomName": "Luisana's Room", "roomId": "3", "floor": "2"}, {"roomName": "Darlyn's Room", "roomId": "8", "floor": "3"}]

client_ddb = boto3.resource('dynamodb')
ddb_table = client_ddb.Table(table_name)
randomVariable = ""
currentTime = ""
now = ""

for x in range(10):
    # while True:
    randomNum = random.randrange(4)
    randomVariable = ''.join(
        [random.choice(string.ascii_letters + string.digits) for n in range(10)])
    currentTime = datetime.utcnow()
    now = datetime.utcnow()
    ttl_number = int(now.strftime('%s'))
    print('id: ' + randomVariable + ' roomName: ' +
          room[randomNum]['roomName'] + ' roomId: ' + room[randomNum]['roomId'] + ' floor: ' + room[randomNum]['floor'] + ' time: ' + str(currentTime))
    ddb_table.put_item(
        Item={
            'id': randomVariable,
            'roomName': room[randomNum]['roomName'],
            'roomId': room[randomNum]['roomId'],
            'floor': room[randomNum]['floor'],
            'timestamp':  str(currentTime.strftime("%Y-%m-%dT%H:%M:%SZ")),
            'ttl': int(now.strftime('%s')),
            # 'favorite': false,
        }
    )
    time.sleep(10)
