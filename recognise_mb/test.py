import cv2
import numpy as np
# White backgroujd
  # image = cv2.imread("test2.png")
  # r = 150.0 / image.shape[1]
  # dim = (150, int(image.shape[0] * r))
  # lower_white = np.array([220, 220, 220], dtype=np.uint8)
  # upper_white = np.array([255, 255, 255], dtype=np.uint8)
  # mask = cv2.inRange(image, lower_white, upper_white) # could also use threshold
  # coloured = image.copy()
  # coloured[mask == 255] = (255, 255, 255)
  # cv2.imwrite('res.png', coloured) # gives black background
# Read image
img = cv2.imread('res.png')
hh, ww = img.shape[:2]

# threshold on white
# Define lower and uppper limits
lower = np.array([200, 200, 200])
upper = np.array([255, 255, 255])

# Create mask to only select black
thresh = cv2.inRange(img, lower, upper)

# apply morphology
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (10,10))
morph = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)

# invert morp image
mask = 255 - morph

# apply mask to image
result = cv2.bitwise_and(img, img, mask=mask)


# save results
cv2.imwrite('pills_thresh.jpg', thresh)
cv2.imwrite('pills_morph.jpg', morph)
cv2.imwrite('pills_mask.jpg', mask)
cv2.imwrite('pills_result2.jpg', result)

cv2.imshow('thresh', thresh)
cv2.imshow('morph', morph)
cv2.imshow('mask', mask)
cv2.imshow('result', result)
cv2.waitKey(0)
cv2.destroyAllWindows()