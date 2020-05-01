import RPi.GPIO as GPIO
import boto3
import random
import string
import time
import datetime

client_ddb = boto3.resource('dynamodb')
ddb_table = client_ddb.Table('PIR-sensor')
randomVariable = ""
currentTime = ""

SENSOR_PIN = 24

GPIO.setmode(GPIO.BCM)
GPIO.setup(SENSOR_PIN, GPIO.IN)


def my_callback(channel):
    # Here, alternatively, an application / command etc. can be started.
    print('Motion detected, sending data to AWS')
    # Generate a random string
    # with 10 characters.
    randomVariable = ''.join([random.choice(string.ascii_letters
                                            + string.digits) for n in range(10)])
    currentTime = datetime.datetime.now()

    print('values sent to dynamodb: id:' +
          randomVariable + ' time: ' + str(currentTime))
    ddb_table.put_item(
        Item={
            'id': randomVariable,
            # 'timestamp':  str(currentTime.strftime("%Y-%m-%d %H:%M:%S")),
            'timestamp':  currentTime,
            'roomId': 1
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
