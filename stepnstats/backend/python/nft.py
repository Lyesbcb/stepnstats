import cv2 as cv
import os
from nftfuncs import *
from sys import argv

ft = True # testing

def get_nft(oimg):
    info = {}
    img = crop(oimg)

    get_sockets(img, info)

    get_idtpqualvl(img, info)

    get_stats(img, info)

    #--------------TEST CODE------------------------
    # print(info)
    #cv.imshow("test", cv.resize(img, (250, 400)))
    #cv.waitKey(0)
    #global ft
    #if ft:
    #    cv.waitKey(0)
    #    ft = False
    #-----------------------------------------------
    print(info)

get_nft(cv.imread(argv[1]))
# if __name__ == "__main__":
#     TEST_FLDR = "nft/base2/test ("
#     #TEST_IMGS = [file for file in os.listdir(TEST_FLDR)]
#     formats = (".png", ".jpg", ".jpeg")

#     for i in range(1, 71):
#         for frmt in formats:
#             path = TEST_FLDR + str(i) + ")" + frmt
#             if os.path.isfile(path):
#                 if False:
#                     pass
#                 else:
#                     oimg = cv.imread(path)
#                     print("INDEX ->", i, frmt)

#                     info = get_nft(oimg)
#                     #cv.imshow('test', oimg)
#                     #cv.waitKey(0)
#                     #info = get_run_durab(oimg)
#                     #info = get_run_nondurab(oimg)
