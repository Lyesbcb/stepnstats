from xml import dom
import cv2
import numpy as np
from skimage import io



img = io.imread("./input/gem/resilience/lvl3.png")

average = img.mean(axis=0).mean(axis=0)

pixels = np.float32(img.reshape(-1, 3))

n_colors = 5
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 200, 0.1)
flags = cv2.KMEANS_RANDOM_CENTERS

_, labels, palette = cv2.kmeans(pixels, n_colors, None, criteria, 10, flags)
_, counts = np.unique(labels, return_counts=True)

dominant = palette[np.argmax(counts)]