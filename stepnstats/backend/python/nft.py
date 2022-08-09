import cv2 as cv
import os
from nftfuncs import *
from sys import argv

def get_nft(oimg):
    info = {}
    img = crop(oimg)

    get_idtpqualvl(img, info)

    get_stats(img, info)

    #--------------TEST CODE------------------------
    # print(info)
    # cv.imshow("test", cv.resize(img, (250, 400)))
    # cv.waitKey(0)
    #-----------------------------------------------
    print(info)

get_nft(cv.imread(argv[1]))
# if __name__ == "__main__":
#     TEST_FLDR = "nft/total/"
#     TEST_IMGS = [file for file in os.listdir(TEST_FLDR)]

#     for i in range(1, 50):
#         oimg = cv.imread(TEST_FLDR + TEST_IMGS[i])
#         print(TEST_IMGS[i], "INDEX ->", i)

#         info = get_nft(oimg)


