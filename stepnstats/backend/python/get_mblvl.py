import os
import cv2 as cv
from math import  prod
import numpy as np
from mse import cmse

formats = (".png", ".jpg", ".jpeg")

BOXES = ["./python/open_mb/lvl{}.png".format(file) for file in range(1, 11)]

def crop_blks(img):
    h, w, _ = img.shape

    for x in range(w):
        #print(np.sum(img[int(h/2):, x]))
        if np.sum(img[int(h/2):, x]) > 500: # old 500
            x1 = x
            break

    for x in range(w):
        #print(np.sum(img[int(h/2):, -x]), np.sum(img[:, -x] == 0), h)
        if np.sum(img[int(h/2):, -x]) > 10000:
            x2 = x
            break
    
    for y in range(h):
        sm = np.sum(img[y, :int(w/2.2)])
        #print(sm)
        if sm > 1000:
            y1 = y
            break

    return img[y1:, x1:-x2]

def get_mblvl(img):
    cimg = cv.cvtColor(img, cv.COLOR_BGR2HSV)

    dst = cv.inRange(cimg, (0, 0, 120), (255, 255, 255))
    cnts, _ = cv.findContours(dst, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
    toph = dst.shape[0]
    mh = int(toph / 5)
    bcnt = None
    for cnt in cnts:
        x, y, w, h = cv.boundingRect(cnt)
        ratio = 1000 * (w * h) / prod(img.shape[:2])
        if ratio > 20 and (mh < y < toph):
            toph = y
            bcnt = cnt

    if cnts != []:
        _, y, _, h = cv.boundingRect(bcnt)
        y1, y2 = y, y + h
        dst = np.reshape(dst, list(dst.shape) + [1,])
        mimg = np.where(dst == 255, img, np.zeros_like(img))
        mimg = mimg[y1:y2, :]
        mimg = crop_blks(mimg)

        #if len(argv) > 1:
        #    cv.imshow('mimg', mimg)
        #    cv.waitKey(0)

        results = []
        mxvl = 500000
        for box in BOXES:
            bimg = cv.imread(box)
            bh, bw, _ = bimg.shape
            wsclr = mimg.shape[0] / bh
            bw = int(wsclr * bw)
            bimg = cv.resize(bimg, (mimg.shape[1], mimg.shape[0]))

            score = cmse(mimg, bimg)

            if score < 30000:
                results.append(score)
            else:
                results.append(mxvl)
            #print(score)

    #print(results)
    bscr = min(results)

    if bscr == mxvl:
        return ""
    else:
        return "{}".format(results.index(bscr) + 1)


if __name__ == "__main__":
    FILE = "mistery box/"
    # Go through files from test1 to test56
    for n in range(43, 128):
        for frmt in formats:
            path = "{}test ({}){}".format(FILE, str(n), frmt)

            if os.path.isfile(path):
                img = cv.imread(path)
                result = get_mblvl(img)
                print("\n Index ->", n, frmt, "- Result:", result)
                cv.imshow('test', img)
                if result != "":
                    cv.imshow('match', cv.imread(BOXES[int(result)-1]))
                else:
                    print("Error finding the right mblvl")
                cv.waitKey(0)
