import cv2 as cv
import numpy as np


def compare_image(img1, img2):
    ret, thresh = cv.threshold(img1, 255, 255,  cv.THRESH_BINARY_INV)
    ret, thresh2 = cv.threshold(img2, 255, 255,  cv.THRESH_BINARY_INV)
    contours, hierarchy = cv.findContours(thresh, 2, 1)
    cnt1 = contours[0]
    contours, hierarchy = cv.findContours(thresh2, 2, 1)
    cnt2 = contours[0]
    ret = cv.matchShapes(cnt1, cnt2, 1, 0.0)
    return ret

