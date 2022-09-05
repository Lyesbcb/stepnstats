import cv2 as cv
import numpy as np
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

def dominant(img):
    """
    Image -> Color
    Return the dominant
    color in given image
    """
    pixels = np.float32(img.reshape(-1, 3))

    n_colors = 5
    criteria = (cv.TERM_CRITERIA_EPS + cv.TERM_CRITERIA_MAX_ITER, 200, .1)
    flags = cv.KMEANS_RANDOM_CENTERS

    _, labels, palette = cv.kmeans(pixels, n_colors, None, criteria, 10, flags)
    _, counts = np.unique(labels, return_counts=True)
    
    np.sort(counts)
    index = np.argmax(counts)
    dominant = palette[index]

    counts[index] = 0
    ndindex = np.argmax(counts)
    nddominant = palette[ndindex]

    return np.array(dominant, dtype="uint8"), np.array(nddominant, dtype="uint8")

def average(img):
    """
    Image -> Color
    Return the average color
    in given image
    """
    average = img.mean(axis=0).mean(axis=0)
    return np.array(average, dtype="uint8")
