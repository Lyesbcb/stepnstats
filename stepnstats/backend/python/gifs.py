import cv2
import numpy as np
from crop import *
from math import dist
from get_quantity import get_quantity
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)
def remove_text_and_border(img):
    """
    Image -> Image
    Remove text and colored border from image

    [REIMPLEMENTED]
    """
    h, w = img.shape[:2]

    # Remove the colored bounding box
    padtrm = 15
    img = img[h//padtrm:,:] 
    img = img[:, (w//padtrm):w-(w//padtrm)]

    h, w = img.shape[:2]

    # Remove the text, by searching for
    # the first half white line under the item
    for y in range(h//2, h):
        if not (False in (img[y,:w//2] == 255)):
            img = img[:y,:]
            break

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

    # Removed all the unnecessary image operations

    ret, th = cv2.threshold(img, 150, 200, cv2.THRESH_BINARY)

    cnt, h = cv2.findContours(th, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # Whole image area
    imgarea = img.shape[0] * img.shape[1] 

    results = []
    for i in range(len(cnt)):
        area = cv2.contourArea(cnt[i])
        ratio = area / imgarea 

        # Use ratio instead of constant values
        if 0.5 > ratio > 0.01: 
            mask = np.zeros_like(img)
            x, y, w, h = cv2.boundingRect(cnt[i])
            crop = image[y : h + y, x : w + x]
            crop = remove_countours(crop)
            crop = set_background_to_white(crop)
            quantity = get_quantity(crop)
            crop = remove_text_and_border(crop)

            # Make sure the item height to width ratio makes sense
            whratio = crop.shape[0] / crop.shape[1]
            if whratio > 0.7:
                # Calculate the distance from this item
                # to other items in result
                # only append the item if it's not
                # close to other items
                box = cv2.boundingRect(cnt[i])
                pos = tuple(box[0:2])
                for b in results:
                    if (dist(b[2], pos) * 1000 / imgarea) < 0.15:
                        break
                else:
                    results.append([crop, quantity, pos])
    # Reverse the results to have the content in the good order
    results = results[::-1]
    return results

