import RPi.GPIO as GPIO
import boto3
import random
import string
import time
from datetime import datetime

client_ddb = boto3.resource('dynamodb')
ddb_table = client_ddb.Table('pirsensordata-dev')
randomVariable = ""
currentTime = ""
now = ""
ttl_number = 0

SENSOR_PIN = 24

GPIO.setmode(GPIO.BCM)
GPIO.setup(SENSOR_PIN, GPIO.IN)


def my_callback(channel):
    # Here, alternatively, an application / command etc. can be started.
    print('Motion detected, sending data to AWS')
    # Generate a random string
    # with 10 characters.
    randomVariable = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(10)])
    currentTime = datetime.now()
    now = datetime.now()
    ttl_number = int(now.strftime('%s'))
    print('values sent to dynamodb: id:' + randomVariable + ' time: ' + str(currentTime) + ' ttl: ' + str(ttl_number))
    ddb_table.put_item(
        Item={
            'id': randomVariable,
            'timestamp':  str(currentTime.strftime("%Y-%m-%d %H:%M:%S")),
            'roomId': 1,
            'ttl': ttl_number,
            # 'object': # boolean
        }
    )

try:
    GPIO.add_event_detect(SENSOR_PIN, GPIO.RISING, callback=my_callback)
    while True:
        time.sleep(100)
except KeyboardInterrupt:
    print "Finish..."
GPIO.cleanup()

