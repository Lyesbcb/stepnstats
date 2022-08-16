import cv2 as cv
from match import best_match
import numpy as np


BOXES = ["./python/mb/lvl" + str(i) + ".png" for i in range(1, 11)]

def get_mblvl(oimg):
    img = cv.cvtColor(oimg, cv.COLOR_BGR2GRAY)

    w = h = int(img.shape[1] / 14.85)

    results = [] 

    for box in BOXES:
        bimg = cv.imread(box, 0)
        bimg = cv.resize(bimg, (w, h))
        _, score = best_match(bimg, img, "cv.TM_CCOEFF_NORMED")

        if score > 0.4:
            results.append(score)
        else:
            results.append(0)

    mx = max(results)

    if mx == 0:
        return "0"
    else:
        return str(results.index(mx) + 1)
