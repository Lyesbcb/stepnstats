import cv2 as cv
import numpy as np

base = cv.imread('./input/gem/resilience/lvl1.png')
test = cv.imread('result.png')

hsv_base = cv.cvtColor(base, cv.COLOR_BGR2HSV)
hsv_test = cv.cvtColor(test, cv.COLOR_BGR2HSV)

h_bins = 50
s_bins = 60
histSize = [h_bins, s_bins]
h_ranges = [0, 180]
s_ranges = [0, 256]
ranges = h_ranges + s_ranges
channels = [0, 1]

hist_base = cv.calcHist([hsv_base], channels, None, histSize, ranges, accumulate=False)
cv.normalize(hist_base, hist_base, alpha=0, beta=1, norm_type=cv.NORM_MINMAX)
hist_test = cv.calcHist([hsv_test], channels, None, histSize, ranges, accumulate=False)
cv.normalize(hist_test, hist_test, alpha=0, beta=1, norm_type=cv.NORM_MINMAX)

compare_method = cv.HISTCMP_CORREL

base_base = cv.compareHist(hist_base, hist_base, compare_method)
base_test = cv.compareHist(hist_base, hist_test, compare_method)

print('base_base Similarity = ', base_base)
print('base_test Similarity = ', base_test)

cv.imshow('base',base)
cv.imshow('test1',test)
cv.waitKey(0)