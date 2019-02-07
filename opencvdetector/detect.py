import numpy as np
import cv2
import sys
import os
import time

import paho.mqtt.client as paho

# Mqtt broker
broker = str(os.environ['BROKER']) #"localhost"
mqttTopic = str(os.environ['TOPIC']) #"axihome/5/field/manual/home/opencv/test/count"
mqttClientName = str(os.environ['CLIENT_NAME']) #"movementdetector-1"
cameraUrl = str(os.environ['STREAM_URL']) #"rtmp://172.16.10.110/live"

threshold = 100
minPixelsChange = 25

client= paho.Client(mqttClientName)
print("Broker : " + broker)
client.connect(broker)
last = -1

# Open video capture
cap = cv2.VideoCapture(cameraUrl)

# Get first frame
ret, last_frame = cap.read()
last_gray_frame = cv2.cvtColor(last_frame, cv2.COLOR_BGR2GRAY)

if last_frame is None:
    exit()

while(cap.isOpened()):

    # Read a frame
    ret, frame = cap.read()

    if frame is None:
        time.sleep(0.05)
        break

    # Filter image
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    #gray = cv2.GaussianBlur(gray,(5,5),0)

    # Get difference between this frame and last frame
    diff = cv2.absdiff(last_gray_frame, gray)

    # Get a binary image for the difference
    ret, diff = cv2.threshold(diff,threshold,255,cv2.THRESH_BINARY)

    # Count white pixel in the difference image
    height, width = diff.shape
    nonzero = cv2.countNonZero(diff)

    if (nonzero < minPixelsChange):
        nonzero = 0

    if (nonzero != last):
        info = client.publish(mqttTopic, nonzero)
        last = nonzero
        if (info.rc != paho.MQTT_ERR_SUCCESS) :
            print("Error publishing Mqtt message")

    # Keep last frame for future use
    last_frame = frame
    last_gray_frame = gray

cap.release()
cv2.destroyAllWindows()
