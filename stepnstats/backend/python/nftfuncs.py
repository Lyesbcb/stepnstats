import cv2 as cv
import numpy as np
from colortools import dominant
from text_reader import parse_text
from runfuncs import reader
from math import dist, prod
import sys


def get_idtpqualvl(oimg, info):
    h, w, _ = oimg.shape
    img = oimg[int(h/2.6):int(h/1.6), :]
    gimg = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

    def get_id():
        idimg = gimg[:int(h/12), int(w/3):int(w/1.5)]

        id = "".join(reader.readtext(idimg, detail=0, allowlist="#0123456789new")).replace("#", "")[:9].replace("new", "")

        return id

    def get_qualtp():
        tpimg = gimg[int(h/8):int(h/5.5), int(w/12):int(w/1.6)]
        
        result = reader.readtext(tpimg, detail=0)
        qual, tp = "", ""

        if len(result) > 1:
            qual, tp = result[-2:]
            if "gger" in tp:
                tp = "Jogger"
            elif "lker" in tp:
                tp = "Walker"
            elif "nner" in tp:
                tp = "Runner"
            elif "ainer" in tp:
                tp = "Trainer"
        
        return qual, tp

    def get_level():
        lvlimg = gimg[int(h/5.5):int(h/4.2), int(w/12):int(w/1.5)]

        lvl = parse_text(lvlimg, config="--psm 7 -c tessedit_char_whitelist=0123456789", process=False)

        return lvl

    info['nftId'] = get_id()
    info['quality'], info['type'] = get_qualtp()
    info['lvl'] = get_level()

def get_stats(oimg, info):
    h, w, _ = oimg.shape
    img = oimg[int(h/1.5):, :]
    gimg = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

    def get_base():
        bimg = gimg[int(h/25):int(h/12), int(w/2.0):int(w/1.1)]
        dst = cv.inRange(bimg, 200, 240)
        dst = cv.erode(dst, (5, 5), iterations=2)
        dst = cv.GaussianBlur(dst, (5, 5), 2)
        cnts = cv.findContours(dst, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)[0]
        vareas = 0
        for cnt in cnts:
            area = prod(cv.boundingRect(cnt)[2:])
            if area > (h * w / 500):
                vareas += 1
        #print("Valid Areas:", vareas)
        #cv.imshow("thresh", dst)
        #cv.waitKey(0)
        return vareas > 1

    def get_nmbrs():
        nimg = gimg[int(h/10):, int(w/1.3):int(w/1.07)]
        
        nmbs = reader.readtext(nimg, detail=0, allowlist="0123456789.")

        if len(nmbs) > 4:
            nmbs = nmbs[-4:]

        info["efficiency"], \
        info["luck"],       \
        info["comfort"],    \
        info["resilience"] = nmbs


    info["base"] = str(get_base()).lower()
    get_nmbrs()

def get_sockets(oimg, info):
    h, w, _ = oimg.shape
    img = oimg[:int(h/2.5), int(w/10):-int(w/10)]
    gimg = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    gimg = cv.inRange(gimg, 0, 220)

    def get_parts():
        nh, nw = img.shape[:2]
        tl = gimg[:int(h/9.5),   :int(w/5)], img[:int(h/9.5),   :int(w/5)] 
        tr = gimg[:int(h/9.5),  -int(w/5):], img[:int(h/9.5),  -int(w/5):]
        bl = gimg[-int(h/9.5):,  :int(w/5)], img[-int(h/9.5):,  :int(w/5)]
        br = gimg[-int(h/9.5):, -int(w/5):], img[-int(h/9.5):, -int(w/5):]

        return [tl[0], tr[0], bl[0], br[0]], [tl[1], tr[1], bl[1], br[1]]

    def cut_blks(parts, oparts):
        for i in range(4):
            h, w = parts[i].shape[:2]

            left, right, top, bot = [False] * 4
            x1, x2, y1, y2 = [0] * 4

            for x in range(w):
                lsm = np.sum(parts[i][int(h/2):, x])
                rsm = np.sum(parts[i][int(h/2):, -x])

                if lsm > 0 and not left:
                    x1 = x
                    left = True
                
                if rsm > 0 and not right: 
                    x2 = -(x + 1)
                    right = True

                if left and right:
                    parts[i] = parts[i][:, x1:x2]
                    oparts[i] = oparts[i][:, x1:x2]
                    break

            for y in range(h):
                tsm = np.sum(parts[i][ y, :])
                bsm = np.sum(parts[i][-y, :])

                if tsm > 0 and not top:
                    y1 = y
                    top = True
                
                if bsm > 0 and not bot: 
                    y2 = -(y + 1)
                    bot = True

                if top and bot:
                    parts[i] = parts[i][y1:y2, :]
                    oparts[i] = oparts[i][y1:y2, :]
                    break

        return parts, oparts

    def get_lvl(pimg, opimg):
        h, w = pimg.shape

        if h < 10 or w < 10:
            return ""

        wts  = np.sum(pimg == 255)
        blks = np.sum(pimg == 0)
        innerblks = np.sum(pimg[int(h/4):-int(h/4), int(w/4):-int(w/4)] == 0)

        y, x = h // 30, w // 30
        y = 2 if y == 0 else y
        x = 2 if x == 0 else x

        for xn in range(x*3, 0, -1):
            clr = tuple(opimg[h//2, xn])
            #print(clr)
            if not ((clr[0] > 190) and
                    (clr[1] > 210) and
                    (clr[2] > 205)):
                break
        
        tps = {
            (140, 140, 245):"comfort",
            (100, 205, 240):"efficiency",
            (240, 172, 148):"resilience",
            (232, 215, 172):"luck"
        }

        bdst = None 
        tp   = None
        for tpclr, name in tps.items():
            dst = dist(clr, tpclr)

            if bdst is None or dst < bdst:
                bdst = dst
                tp   = name
        
        corners = pimg[y, x], pimg[y, -x], pimg[-(y*3), x], pimg[-(y*3), -x]
        lvl = 1
        if blks > wts:
            lvl = 0
        elif innerblks < 50: 
            return tp
        else:
            for corner in corners:
                if corner == 255:
                    lvl += 1

        return "{}Lvl{}".format(tp, lvl)

    def check_valid(pimg):
        slides = pimg[:, 0], pimg[:, -1], pimg[0, :], pimg[-1, :]

        for slide in slides:
            if np.sum(slide) == 0:
                break
        else:
            return True

        return False

    parts, oparts = get_parts()
    parts, oparts = cut_blks(parts, oparts)

    for i in range(4):
        if check_valid(parts[i]):
            info["socket{}".format(i+1)] = get_lvl(parts[i], oparts[i])
        else:
            info["socket{}".format(i+1)] = ""

        #print(info)
        #cv.imshow("oparts", oparts[i])
        #cv.imshow("parts", parts[i])
        #cv.waitKey(0)


def crop(oimg):
    oimg = oimg[:, 5:-5]
    h, w, _ = oimg.shape
    img = cv.inRange(oimg, (0, 0, 0), (60, 60, 60))

    rho = 1
    theta = np.pi / 180
    min_length = h // 1.5
    max_gap = 20

    #cv.imshow("test", cv.resize(oimg, (500, 700)))
    #cv.waitKey(0)
    lines = cv.HoughLinesP(img, rho, theta, 15, (), min_length, max_gap)

    cx1, cy1, cx2, cy2 = 0, h//2, w, h//2

    for line in lines:
        #timg = cv.line(oimg, (line[0][0], line[0][1]), (line[0][2], line[0][3]), (0, 255, 0), 5)
        for _, y1, _, y2 in line:
            ys = (y1, y2)

            for y in ys:
                if y < cy1:
                    cy1 = y
                elif y > cy2:
                    cy2 = y

    #cv.imshow('timg', cv.resize(timg, (500, 700)))
    #cv.waitKey(0)

    return oimg[cy1:cy2, cx1:cx2]

