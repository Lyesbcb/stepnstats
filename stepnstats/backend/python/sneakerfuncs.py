import cv2 as cv
import numpy as np
from colortools import dominant
from text_reader import parse_text
from runfuncs import reader


def get_idtpqualvl(oimg, info):
    h, w, _ = oimg.shape
    img = oimg[int(h/2.6):int(h/1.6), :]
    gimg = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

    def get_id():
        idimg = gimg[:int(h/12), int(w/3):int(w/1.5)]

        id = "".join(reader.readtext(idimg, detail=0)).replace("#", "")[:9]

        return id

    def get_qualtp():
        tpimg = gimg[int(h/8):int(h/5.5), int(w/12):int(w/1.6)]

        result = reader.readtext(tpimg, detail=0)

        if len(result) > 1:
            return result[-2:]
        else:
            return "", ""

    def get_level():
        lvlimg = gimg[int(h/5.5):int(h/4.2), int(w/12):int(w/3.0)]

        lvl = parse_text(
            lvlimg, config="--psm 7 -c tessedit_char_whitelist=0123456789", process=False)

        return lvl

    info['nftid'] = get_id()
    info['quality'], info['type'] = get_qualtp()
    info['lvl'] = get_level()


def get_stats(oimg, info):
    h, w, _ = oimg.shape
    img = oimg[int(h/1.5):, :]
    gimg = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

    def get_base():
        bimg = gimg[int(h/25):int(h/14), int(w/1.8):int(w/1.4)]

        return np.sum((bimg < 240) & (bimg > 200)) > (h * w / 4000)

    def get_nmbrs():
        nimg = gimg[int(h/10):, int(w/1.3):int(w/1.07)]

        nmbs = reader.readtext(nimg, detail=0)

        if len(nmbs) > 4:
            nmbs = nmbs[-4:]

        info["efficiency"], \
            info["luck"],       \
            info["comfort"],    \
            info["resilience"] = nmbs

    info["base"] = str(get_base()).lower()
    get_nmbrs()


def crop(oimg):
    h, w, _ = oimg.shape
    img = cv.inRange(oimg, (0, 0, 0), (60, 60, 60))

    rho = 1
    theta = np.pi / 180
    min_length = h // 2
    max_gap = 20

    lines = cv.HoughLinesP(img, rho, theta, 15, (), min_length, max_gap)

    cx1, cy1, cx2, cy2 = 0, h//2, w, h//2

    for line in lines:
        for _, y1, _, y2 in line:
            ys = (y1, y2)

            for y in ys:
                if y < cy1:
                    cy1 = y
                elif y > cy2:
                    cy2 = y

    return oimg[cy1:cy2, cx1:cx2]
