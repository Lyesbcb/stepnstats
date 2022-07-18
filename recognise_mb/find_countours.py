import cv2 
import numpy as np 

image =cv2.imread('./input/screens/run/stepn.png')
cv2.imshow('Original Image',image)

gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
cv2.imshow('Gray Image',gray)

_,binary = cv2.threshold(gray,100,255,cv2.THRESH_BINARY)
cv2.imshow('Binary image',binary)

contours,hierarchy = cv2.findContours(binary,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
drawing = np.zeros((gray.shape[0], gray.shape[1], 3), dtype=np.uint8)
CountersImg = cv2.drawContours(drawing,contours, -1, (255,255,0),3)
cv2.imshow('Contours',CountersImg)
ImgWithCounter = cv2.drawContours(image,contours, -1, (255,255,0),3)
cv2.imshow('Image with counters',ImgWithCounter)
cv2.waitKey(0)
