import RPi.GPIO as GPIO
import time
import datetime
SENSOR_PIN = 24

GPIO.setmode(GPIO.BCM)
GPIO.setup(SENSOR_PIN, GPIO.IN)


def my_callback(channel):
    # Here, alternatively, an application / command etc. can be started.
    currentTime = datetime.datetime.now()
    print('Motion detected! @' + str(currentTime.strftime("%Y-%m-%d %H:%M:%S")))

try:
    GPIO.add_event_detect(SENSOR_PIN, GPIO.RISING, callback=my_callback)
    while True:
        time.sleep(100)
except KeyboardInterrupt:
    print "Finish..."
GPIO.cleanup()
