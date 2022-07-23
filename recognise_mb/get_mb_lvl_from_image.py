import cv2
import numpy as np
import matplotlib.pyplot as plt
from resize import resize
from crop import crop_bottom_half_and_top_half

def get_mb_lvl_from_image(img , type):
	
	if type == "run":
		test_image = crop_bottom_half_and_top_half(img)
	else:
		#convert the color to be inline with matplotlib. open uses the BGR sequence, where
		test_image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

		#load the train image and display it
		#convert the color to be inline with matplotlib. open uses the BGR sequence, whereas the matplotlib interp
	if type == "run":
		mbs = [
			cv2.cvtColor(cv2.imread("./input/mb/lvl1.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/mb/lvl2.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/mb/lvl3.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/mb/lvl4.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/mb/lvl5.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/mb/lvl6.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/mb/lvl7.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/mb/lvl8.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/mb/lvl9.png"), cv2.COLOR_BGR2RGB),
			]
	else:
		mbs = [
			cv2.cvtColor(cv2.imread("./input/open_mb/lvl1.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/open_mb/lvl2.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/open_mb/lvl3.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/open_mb/lvl4.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/open_mb/lvl5.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/open_mb/lvl6.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/open_mb/lvl7.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/open_mb/lvl8.png"), cv2.COLOR_BGR2RGB),
			cv2.cvtColor(cv2.imread("./input/open_mb/lvl9.png"), cv2.COLOR_BGR2RGB),
			]
	precisions = [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4]
	result = []

	def get_number_of_positif_result(train_image, precision):
		#find the keypoints and descriptors of both train and test images
		kp1,des1 = orb.detectAndCompute(train_image, None)
		kp2, des2 = orb.detectAndCompute(test_image, None)

		bf = cv2.BFMatcher()
		matches = bf.knnMatch(des1, des2, k=2)

		# Apply ratio test
		good = []
		# if the distance between the matches is less than 75% then it is considered as good match, else disc
		for m,n in matches:
			if m.distance < precision*n.distance:
				good.append ([m])
		return len(good)
		
	#create ORB (Oriented fast and Rotated Brief) using the SIFT
	orb = cv2.SIFT_create()

	for mb, precision in zip(mbs, precisions):
		result.append(get_number_of_positif_result(mb, precision))

	print(result.index(max(result)) + 1)
	if max(result) > 5:
		return result.index(max(result)) + 1
	else:
		return 0