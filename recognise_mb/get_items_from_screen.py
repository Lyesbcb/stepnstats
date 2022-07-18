import cv2;
import numpy as np;
from crop import *

def remove_countours(image):
  gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
  thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU + cv2.THRESH_BINARY)[1]

  # Find contour and sort by contour area
  cnts = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
  cnts = cnts[0] if len(cnts) == 2 else cnts[1]
  cnts = sorted(cnts, key=cv2.contourArea, reverse=True)

  # Find bounding box and extract ROI
  for c in cnts:
      x,y,w,h = cv2.boundingRect(c)
      ROI = image[y:y+h, x:x+w]
      break

  return ROI

def get_items_from_screen(img_path):
    image = crop_bottom_half(cv2.imread(img_path))
    img = crop_bottom_half(cv2.imread(img_path, 0))
    h, w = img.shape[:2]
    kernel = np.ones((15,15),np.uint8)

    e = cv2.erode(img,kernel,iterations = 2)  
    d = cv2.dilate(e,kernel,iterations = 1)
    ret, th = cv2.threshold(d, 150, 255, cv2.THRESH_BINARY_INV)

    mask = np.zeros((h+2, w+2), np.uint8)
    cv2.floodFill(th, mask, (200,200), 255); # position = (200,200)
    out = cv2.bitwise_not(th)
    out= cv2.dilate(out,kernel,iterations = 3)
    cnt, h = cv2.findContours(out,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
    results = []
    for i in range(len(cnt)):
        area = cv2.contourArea(cnt[i])
        if(area>10000 and area<100000):
            mask = np.zeros_like(img)
            cv2.drawContours(mask, cnt, i, 255, -1)
            x,y,w,h = cv2.boundingRect(cnt[i])
            crop= image[y:h+y,x:w+x]
            cv2.imwrite("test.png", crop)
            crop = remove_countours(crop)
            cv2.imshow("test", crop)
            cv2.waitKey()
            results.append(crop)
    return results