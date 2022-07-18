import cv2
import numpy as np
from crop import crop_bottom_half

img = crop_bottom_half(cv2.imread('input\screens\open_mb\lvl9\mb1.png'))
gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
thresh_img = cv2.threshold(gray_img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

cnts = cv2.findContours(thresh_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cnts = cnts[0] if len(cnts) == 2 else cnts[1]
for cnt in cnts:
    approx = cv2.contourArea(cnt)
    print(approx)

cv2.imwrite('shapes.png', thresh_img)
cv2.waitKey()