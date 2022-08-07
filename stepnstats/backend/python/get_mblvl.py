import os
import cv2 as cv
from math import sqrt
from tmatch import best_match


formats = (".png", ".jpg", ".jpeg")

BOXES = ["./python/open_mb/lvl{}.png".format(file) for file in range(1, 11)]

def get_mblvl(img):
    img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

    def aux(iteration=1):
        h, w = img.shape
        if iteration == 2:
            h = h - 180

        scaler = ((h / w) ** 3.25) * 0.1265

        results = []

        for box in BOXES:
            bimg = cv.imread(box, 0)
            bh, bw = bimg.shape
            rsw, rsh = (int(bw * scaler), int(bh * scaler))
            bimg = cv.resize(bimg, (rsw, rsh))
            _, score = best_match(bimg, img, "cv.TM_CCOEFF_NORMED")

            if score > 0.6:
                results.append(score)
            else:
                results.append(0)

        mx = max(results)

        if mx == 0:
            if iteration == 2:
                return ""
            else:
                return aux(iteration+1)
        else:
            return str(results.index(mx) + 1)

    return aux()

# if __name__ == "__main__":
#     FILE = "mistery box/"
#     # Go through files from test1 to test56
#     for n in range(1, 20):
#         for frmt in formats:
#             path = "{}test ({}){}".format(FILE, str(n), frmt)

#             if os.path.isfile(path):
#                 img = cv.imread(path)
#                 result = get_mblvl(img)
#                 print("\n Index ->", n, frmt, "- Result:", result)
#                 cv.imshow('test', img)
#                 cv.imshow('match', cv.imread(BOXES[int(result)-1]))
#                 cv.waitKey(0)
