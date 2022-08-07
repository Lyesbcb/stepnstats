from tkinter import W
import cv2 as cv
from runfuncs import *
import os
from get_mb_lvl_from_image import get_mblvl
from sys import argv


def get_run_durab(oimg):
    img = crop_bot(oimg)
    img = crop_top(img)

    rects = top_rects(img)

    info = {}

    get_kmdt(img, rects[0], info)
    get_drst(img, rects[2], info)

    botimg = bot_part(img)

    get_tplvlgst(botimg, info)

    info["mbLvl"] = get_mblvl(oimg)

    get_eniddlst(botimg, info)

    # ---------------TEST CODE--------------------------------------
    # print(info)
    #
    # for rect in rects:
    #    img = cv.rectangle(img, rect[0], rect[1], (0, 255, 0), 5)
    #
    # print(info)
    #cv.imshow("test.png", cv.resize(img, (250, 400)))
    # cv.waitKey(0)
    # ---------------------------------------------------------------

    print(info)


def get_run_nondurab(oimg):
    img = oimg

    info = {}

    rects = top_rects(img)

    get_kmdt_nd(img, rects[0], info)

    get_tplvlgst(img, info, nondurab=rects[1])

    get_ideng(img, info)

    info["mbLvl"] = get_mblvl(oimg)

    # --------------TEST CODE---------------------------------------
    # for rect in rects:
    #    img = cv.rectangle(img, rect[0], rect[1], (0, 255, 0), 5)
    #
    # print(info)
    #cv.imshow('nonduarb', cv.resize(img, (250, 400)))
    # cv.waitKey(0)
    # --------------------------------------------------------------

    print(info)


img = cv.imread("./"+argv[1])
b, g, r = img[0, 0]

if ((b > 240 and
        g > 240 and
        r > 240) or
        (5 > b > 0 and
         8 > g > 4 and
         r == 0)):
    get_run_nondurab(img)
else:
    get_run_durab(img)

# if __name__ == "__main__":
#     TEST_FLDR = "Run/test 2/"
#     TEST_IMGS = [file for file in os.listdir(TEST_FLDR)]

#     for i in range(1, 50):
#         if (TEST_IMGS[i].endswith("JPEG") or
#             TEST_IMGS[i].endswith("lauric thomas.jpg") or
#             TEST_IMGS[i].endswith("Andre Kro.jpg")):
#             continue

#         oimg = cv.imread(TEST_FLDR + TEST_IMGS[i])
#         print(TEST_IMGS[i], "INDEX ->", i)

#         print(get_run(oimg))
#         cv.imshow('test', oimg)
#         cv.waitKey(0)
#         #info = get_run_durab(oimg)
#         #info = get_run_nondurab(oimg)
