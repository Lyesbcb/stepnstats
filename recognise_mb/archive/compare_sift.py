import cv2
import numpy as np
import matplotlib.pyplot as plt
from resize import resize
from time_execution import *
from crop import crop_bottom_half

start()
test_image = resize(cv2.imread('test.png'), 100)

#convert the color to be inline with matplotlib. open uses the BGR sequence, where
test_image = cv2.cvtColor(test_image, cv2.COLOR_BGR2RGB )

#load the train image and display it
train_image = cv2.imread("./input/gem/resilience/lvl1.png")
#convert the color to be inline with matplotlib. open uses the BGR sequence, whereas the matplotlib interp
train_image = cv2.cvtColor(train_image, cv2.COLOR_BGR2RGB )

#create ORB (Oriented fast and Rotated Brief) using the SIFT
orb = cv2.SIFT_create()
#find the keypoints and descriptors of both train and test images
kp1,des1 = orb.detectAndCompute(train_image, None)
kp2, des2 = orb.detectAndCompute(test_image, None)

bf = cv2.BFMatcher()
matches = bf.knnMatch(des1, des2, k=2)

# Apply ratio test
good = []
# if the distance between the matches is less than 75% then it is considered as good match, else disc
for m,n in matches:
	if m.distance < 0.60*n.distance:
		good.append ([m])
stop()

# in the below Line we are considering the top 100 matches and hence good[:100]
img3 = cv2.drawMatchesKnn(train_image, kp1, test_image, kp2, good[: 100], None, flags=2)
fig = plt.figure(figsize=(15,15))
ax = fig.add_subplot(111)
ax.imshow(img3)
plt.show()
