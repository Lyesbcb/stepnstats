import cv2 as cv
import os
from sneakerfuncs import *


def get_sneaker(oimg):
    info = {}
    img = crop(oimg)

    get_idtpqualvl(img, info)

    get_stats(img, info)

    #--------------TEST CODE------------------------
    # print(info)
    #cv.imshow("test", cv.resize(img, (250, 400)))
    #cv.waitKey(0)
    #-----------------------------------------------

# if __name__ == "__main__":
#     TEST_FLDR = "sneaker/base2/test ("
#     #TEST_IMGS = [file for file in os.listdir(TEST_FLDR)]
#     formats = (".png", ".jpg", ".jpeg")
    # for i in range(1, 50):
    #     for frmt in formats:
    #         path = TEST_FLDR + str(i) + ")" + frmt
    #         if os.path.isfile(path):
                # if False: #((i == 1 and frmt == ".png") or
                    #(i == 2 and frmt == ".jpg") or
                    #(i == 3 and frmt == ".jpg") or
                    #(i == 11 and frmt == ".png")): 
                #     pass
                # else:
                #     oimg = cv.imread(path)
                #     print("INDEX ->", i, frmt)

                #     info = get_sneaker(oimg)
                #     cv.imshow('test', oimg)
                #     cv.waitKey(0)
                    #info = get_run_durab(oimg)
                    #info = get_run_nondurab(oimg)
