import cv2 as cv
from match import best_match
import numpy as np


BOXES = ["./python/mb/lvl" + str(i) + ".png" for i in range(1, 11)]

def get_mblvl(oimg):
    img = cv.cvtColor(oimg, cv.COLOR_BGR2GRAY)

    w = h = int(img.shape[1] / 14.85)

    results = [] 

    for i, box in enumerate(BOXES):
        bimg = cv.imread(box, 0)
        bimg = cv.resize(bimg, (w, h))
        _, score = best_match(bimg, img, "cv.TM_CCOEFF_NORMED")

        if score > (0.4 if i != 9 else 0.48):
            results.append(score)
        else:
            results.append(0)

    mx = max(results)

    if mx == 0:
        return ""
    else:
        ind = results.index(mx) + 1
        return str(ind)

