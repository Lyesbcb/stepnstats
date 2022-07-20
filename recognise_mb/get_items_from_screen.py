import cv2
import numpy as np
from crop import *
from get_quantity import get_quantity

def remove_text_and_border(img):
    # target boxes
    boxes = []

    height = img.shape[0]
    width = img.shape[1]
    # top box
    tl = [0, 0]
    br = [int(height), 10]
    boxes.append([tl, br])

    # bottom box
    tl = [0, height-10]
    br = [width, width]
    boxes.append([tl, br])

    # left box 
    tl = [0, 0]
    br = [10, width]
    boxes.append([tl, br])

    # right box 
    tl = [width-10, 0]
    br = [width, height]
    boxes.append([tl, br])
    
    # text box  1
    tl = [width-50, height- 70]
    br = [width, height]
    boxes.append([tl, br])
    
    # text box  2
    tl = [width-100, height- 50]
    br = [width, height]
    boxes.append([tl, br])

    # redact with numpy slicing
    for box in boxes:
        tl, br = box
        img[tl[1] : br[1], tl[0] : br[0]] = [255, 255, 255]
    return img

def set_background_to_white(img):
    r = 150.0 / img.shape[1]
    dim = (150, int(img.shape[0] * r))
    lower_white = np.array([220, 220, 220], dtype=np.uint8)
    upper_white = np.array([255, 255, 255], dtype=np.uint8)
    mask = cv2.inRange(img, lower_white, upper_white) # could also use threshold
    coloured = img.copy()
    coloured[mask == 255] = (255, 255, 255)
    return coloured

def remove_countours(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU + cv2.THRESH_BINARY)[1]

    # Find contour and sort by contour area
    cnts = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]
    cnts = sorted(cnts, key=cv2.contourArea, reverse=True)

    # Find bounding box and extract ROI
    for c in cnts:
        x, y, w, h = cv2.boundingRect(c)
        ROI = image[y : y + h, x : x + w]
        break

    # replace with white
    return ROI


def get_items_from_screen(img_path):
    image = crop_bottom_half(cv2.imread(img_path))
    img = crop_bottom_half(cv2.imread(img_path, 0))
    h, w = img.shape[:2]
    kernel = np.ones((15, 15), np.uint8)

    e = cv2.erode(img, kernel, iterations=2)
    d = cv2.dilate(e, kernel, iterations=1)
    ret, th = cv2.threshold(d, 150, 200, cv2.THRESH_BINARY_INV)

    mask = np.zeros((h + 2, w + 2), np.uint8)
    cv2.floodFill(th, mask, (100, 100), 255)
    # position = (200,200)
    out = cv2.bitwise_not(th)
    out = cv2.dilate(out, kernel, iterations=3)
    cnt, h = cv2.findContours(out, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    results = []
    for i in range(len(cnt)):
        area = cv2.contourArea(cnt[i])
        if area > 10000 and area < 100000:
            mask = np.zeros_like(img)
            x, y, w, h = cv2.boundingRect(cnt[i])
            crop = image[y : h + y, x : w + x]
            crop = remove_countours(crop)
            crop = set_background_to_white(crop)
            text = get_quantity(crop)
            crop = remove_text_and_border(crop)
            results.append([crop, text])
    return results

