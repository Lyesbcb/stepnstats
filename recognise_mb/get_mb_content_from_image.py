# To get content of a mb I go to check proximity of icon (gem, gst or mint) and the text (x1, x3 or x3.37)
import cv2
import numpy as np
import matplotlib.pyplot as plt
from resize import resize
from crop import crop_bottom_half

def get_mb_content_from_image(img):
	test_image = crop_bottom_half(resize(img, 100))
	#convert the color to be inline with matplotlib. open uses the BGR sequence, where
	test_image = cv2.cvtColor(test_image, cv2.COLOR_BGR2RGB)

	#load the train image and display it
	#convert the color to be inline with matplotlib. open uses the BGR sequence, whereas the matplotlib interp
	possible_content = [
		cv2.cvtColor(cv2.imread("./input/gem/comfort/lvl1.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/comfort/lvl2.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/comfort/lvl3.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/comfort/lvl4.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/comfort/lvl5.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/comfort/lvl6.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/comfort/lvl7.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/comfort/lvl8.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/comfort/lvl9.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/efficiency/lvl1.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/efficiency/lvl2.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/efficiency/lvl3.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/efficiency/lvl4.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/efficiency/lvl5.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/efficiency/lvl6.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/efficiency/lvl7.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/efficiency/lvl8.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/efficiency/lvl9.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/resilience/lvl1.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/resilience/lvl2.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/resilience/lvl3.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/resilience/lvl4.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/resilience/lvl5.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/resilience/lvl6.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/resilience/lvl7.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/resilience/lvl8.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/resilience/lvl9.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/luck/lvl1.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/luck/lvl2.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/luck/lvl3.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/luck/lvl4.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/luck/lvl5.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/luck/lvl6.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/luck/lvl7.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/luck/lvl8.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gem/luck/lvl9.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/scroll/common.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/scroll/uncommon.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/scroll/rare.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/scroll/epic.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/scroll/legendary.png"), cv2.COLOR_BGR2RGB),
		cv2.cvtColor(cv2.imread("./input/gst.png"), cv2.COLOR_BGR2RGB)
	]
	content =  [
		"comfort_lvl1",
		"comfort_lvl2",
		"comfort_lvl3", 
		"comfort_lvl4", 
		"comfort_lvl5", 
		"comfort_lvl6", 
		"comfort_lvl7", 
		"comfort_lvl8", 
		"comfort_lvl9",
		"efficiency_lvl1",
		"efficiency_lvl2",
		"efficiency_lvl3", 
		"efficiency_lvl4", 
		"efficiency_lvl5", 
		"efficiency_lvl6", 
		"efficiency_lvl7", 
		"efficiency_lvl8", 
		"efficiency_lvl9",
		"resilience_lvl1",
		"resilience_lvl2",
		"resilience_lvl3",
		"resilience_lvl4",
		"resilience_lvl5",
		"resilience_lvl6",
		"resilience_lvl7",
		"resilience_lvl8",
		"resilience_lvl9",
		"luck_lvl1",
		"luck_lvl2",
		"luck_lvl3",
		"luck_lvl4",
		"luck_lvl5",
		"luck_lvl6",
		"luck_lvl7",
		"luck_lvl8",
		"luck_lvl9",
		"scroll_common",
		"scroll_uncommon",
		"scroll_rare",
		"scroll_epic",
		"scroll_legendary",
		"gst"
		]
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

	for x in range(len(possible_content)):
		score = get_number_of_positif_result(possible_content[x], 0.60)
		if score > 0:
			result.append({content[x], score})
	
	return result