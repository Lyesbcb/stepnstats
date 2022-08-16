from text_reader import parse_text
from colortools import dominant
import numpy as np
import easyocr
import cv2 as cv


reader = easyocr.Reader(['en'], gpu=False)

def crop_bot(img):
    h, w, _ = img.shape

    for y in range(-1, -400, -1):
        clr = img[y, w//2]
        b, g, r = clr

        # print(h + y, w // 2, b, g, r)

        if (220 > b > 180 and
            255 >= g > 230 and
            165 > r > 80):

            return img[:y,:]

def first_wtline(img):
    end = img.shape[0] // 2

    for y in range(end):
        mask = img[y, :] > 240 
        if np.sum(mask) < 1200: 
            #print(np.sum(mask))
            pass
        else:
            break

    return y 
    
def crop_top(img):
    wl = first_wtline(img)

    img = img[wl:,:]

    return img

def top_rects(img):
    h, w, _ = img.shape

    segnum = 8
    segh = h // segnum 
    segs = [((0, i * segh), (w, (i+1) * segh)) for i in range(segnum)]

    return segs[:3]

def get_kmdt(img, tlbr, info):
    img = img[tlbr[0][1]:tlbr[1][1], tlbr[0][0]:tlbr[1][0]]
    h, w, _ = img.shape

    def get_km():
        kmimg = img[:, int(w/1.8):w-int(w/9.5)]
        kmimg = cv.cvtColor(kmimg, cv.COLOR_BGR2GRAY)

        rngd = cv.inRange(kmimg, 0, 235) 
        km = parse_text(rngd, config="--psm 7 -c tessedit_char_whitelist=0123456789,.", process=False)

        if km == "":
            rngd = cv.inRange(kmimg, 0, 220) 
            km = parse_text(rngd, config="--psm 7 -c tessedit_char_whitelist=0123456789,.", process=False)

        if "," in km:
            km = km.replace(",", ".")

        return km

    def get_date():
        dtimg = img[int(h/1.5):,int(w/5):int(w/1.8)]
        dtimg = cv.cvtColor(dtimg, cv.COLOR_BGR2GRAY)

        rngd = cv.inRange(dtimg, 0, 240)
        date = "".join(reader.readtext(rngd, detail=0, allowlist="0123456789/:")).replace(" ", "")

        date = date[:10] + " " + date[10:]
        dt, tm = date.split(" ")
        day, month, year = dt.split("/")
        date = "{0}-{1}-{2}T{3}:00.000Z".format(year, month, day, tm)

        return date

    info["km"] = get_km() 
    info["date"] = get_date()

def get_kmdt_nd(img, tlbr, info):
    img = img[tlbr[0][1]:tlbr[1][1], tlbr[0][0]:tlbr[1][0]]
    h, w, _ = img.shape

    def get_km():
        kmimg = img[:, int(w/1.8):w-int(w/5)]
        kmimg = cv.cvtColor(kmimg, cv.COLOR_BGR2GRAY)

        rngd = cv.inRange(kmimg, 0, 235) 
        km = parse_text(rngd, config="--psm 7 -c tessedit_char_whitelist=0123456789,.", process=False)

        if km == "":
            rngd = cv.inRange(kmimg, 0, 140) 
            km = parse_text(rngd, config="--psm 7 -c tessedit_char_whitelist=0123456789,.", process=False)

        if km == "":
            prsd = reader.readtext(rngd, detail=0)
            if prsd != []:
                km = prsd[0] 

        if "," in km:
            km = km.replace(",", ".")


        return km

    def get_date():
        dtimg = img[int(h/1.5):,int(w/5):int(w/1.8)]
        dtimg = cv.cvtColor(dtimg, cv.COLOR_BGR2GRAY)

        rngd = cv.inRange(dtimg, 0, 200)
        date = parse_text(rngd, config="--psm 7 -c tessedit_char_whitelist=0123456789/:", process=False) 

        if "/" in date:
            date = date[:10] + " " + date[10:]
            dt, tm = date.split(" ")
            day, month, year = dt.split("/")
            date = "{0}-{1}-{2}T{3}:00.000Z".format(year, month, day, tm)

        return date

    info["gst"] = get_km() 
    info["date"] = get_date()



def get_drst(img, tlbr, info):
    img = img[tlbr[0][1]:tlbr[1][1], tlbr[0][0]:tlbr[1][0]]
    h, w, _ = img.shape

    def get_steps():
        stpimg = img[:int(h/1.55),int(w/1.6):w-int(w/8)]
        stpimg = cv.cvtColor(stpimg, cv.COLOR_BGR2GRAY)

        rngd   = cv.inRange(stpimg, 5, 220)
        steps = parse_text(rngd, config="--psm 7 -c tessedit_char_whitelist=0123456789", process=False)

        if len(steps) < 4: 
            rngd   = cv.threshold(stpimg, 0, 255, cv.THRESH_OTSU)[1]
            steps = parse_text(rngd, config="--psm 7 -c tessedit_char_whitelist=0123456789", process=False)

        steps = steps.replace(" ", "")
        
        return steps 

    def get_duration():
        drimg = img[:int(h/1.55),int(w/10):int(w/2)]
        drimg = cv.cvtColor(drimg, cv.COLOR_BGR2GRAY)

        rngd   = cv.threshold(drimg, 0, 255, cv.THRESH_OTSU)[1]
        duration = parse_text(rngd, config="--psm 7 -c tessedit_char_whitelist=0123456789:", process=False)

        return duration

    info["steps"] = get_steps()
    info["duration"] = get_duration()

def bot_part(img):
    h, w, _ = img.shape
    img = img[int(h/2.2):h-int(h/6.5),int(w/8):]

    return img

def get_quality(color):
    b, g, r = color
    #print(b, g, r)

    if (215 < b < 250 and
        215 < g < 250 and
        215 < r < 250):
          return "Common"
    elif (110 < b < 125 and
          170 < g < 180 and
          70  < r < 105):
        return "Uncommon"
    elif (200 < b < 215 and
          165 < g < 180 and
          60  < r < 100):
          return "Rare"
    elif (190 < b < 210 and
          95  < g < 110 and
          145 < r < 155):
          return "Epic"


def get_tplvlgst(img, info, nondurab=None):
    h, w, _ = img.shape
    img = img[:int(h/3),:] if nondurab is None else img[nondurab[0][1]:nondurab[1][1], nondurab[0][0]:nondurab[1][0]]
    gimg = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

    def get_typelevelqual():
        tpimg = gimg[:int(h/5), int(w/10):int(w/2.8)] if nondurab is None else gimg[:int(h/14), int(w/10):int(w/2)]
        tplevel = "".join(reader.readtext(tpimg, detail=0, allowlist="jgerwalkuntiv0123456789")).lower()

        if not ("lv" in tplevel):
            if not ("v" in tplevel):
                return "", "", ""
            else:
                i = tplevel.index("v") - 1
        else:
            i = tplevel.index("lv")

        level = tplevel[i+2:i+4]
        
        if "gger" in tplevel:
            tp = "Jogger"
        elif "lker" in tplevel:
            tp = "Walker"
        elif "nner" in tplevel:
            tp = "Runner"
        elif "iner" in tplevel:
            tp = "Trainer"
        else:
            tp = "unknown"

        qimg = img[:int(h/5), int(w/10):int(w/2.8)]
        doms = dominant(qimg)

        for dom in doms:
            if (dom[0] >= 240 and
                dom[1] > 245  and
                dom[2] >= 240):
                continue
            else:
                qual = get_quality(dom)
                break

        return tp, level, qual 

    def get_gst():
        gsimg = gimg[:int(h/2), int(w/1.5):int(w/1.05)]

        gst = parse_text(gsimg, config="--psm 7 -c tessedit_char_whitelist=0123456789.,+", process=False)

        if "+" in gst:
            gst = gst.replace("+", "")

        if "," in gst:
            gst = gst.replace(",", ".")

        return gst

    tp, level, qual = get_typelevelqual()
    info["type"]  = tp
    info["lvl"] = level
    info["gst"]   = get_gst()
    info["quality"] = qual

def get_eniddlst(img, info):
    h, w, _ = img.shape
    img = img[int(h/1.8):,:]

    def get_id():
        idimg = img[int(h/12):int(h/5),:int(w/2.5)]

        id = parse_text(idimg, config="--psm 7 -c tessedit_char_whitelist=#0123456789")

        if "#" in id:
            id = id.replace("#", "")

        return id

    def get_durab():
        drimg = img[int(h/6):int(h/2.7), int(w/3):int(w/2)]

        rngs = [
                cv.inRange(drimg, (0, 0, 120), (120, 120, 255)),
                cv.inRange(drimg, (0, 0, 120), (110, 110, 255)),
                cv.inRange(drimg, (0, 0, 120), (50, 50, 255))
        ]

        for rng in rngs:
            durab = parse_text(rng, config="--psm 7 -c tessedit_char_whitelist=-0123456789", process=False)

            if durab == "":
                continue
            else:
                break

        if durab == "":
            durab = "".join(reader.readtext(cv.cvtColor(drimg, cv.COLOR_BGR2GRAY), detail=0))

        return durab.replace("-", "").replace(" ", "")

    def get_energy():
        enimg = img[int(h/8):int(h/2.7), int(w/1.5):]

        energy = parse_text(enimg, config="--psm 7 -c tessedit_char_whitelist=0123456789,.-")

        if "-" in energy:
            energy = energy.replace("-", "")
        
        if "," in energy:
            energy = energy.replace(",", ".")

        return energy 

    info["nftId"] = get_id()
    info["energy"] = get_energy()
    info["durabilityLost"] = get_durab()

def get_kmdrstps(img, info):
    h, w, _ = img.shape
    img = img[int(h/2.1):int(h/1.9), :]
    gimg = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

    text = reader.readtext(gimg, detail=0)

    if len(text) != 3:
        km = dur = stp = ""
    else:
        km, dur, stp = text
        dur = dur.replace('.', ':')

    info['km'] = km
    info['duration'] = dur
    info['steps'] = stp

def get_ideng(oimg, info):
    h, w, _ = oimg.shape
    img = oimg[int(h/4):int(h/2.2), :]
    gimg = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

    def get_energy():
        enimg = gimg[:int(h/8),int(w/1.3):]

        energy = "".join(reader.readtext(enimg, detail=0, allowlist="x0123456789.-"))

        if "x" in energy:
            energy = energy[2:]

        if "-" in energy:
            energy = energy.replace("-", "")

        return energy

    def get_id():
        idimg = gimg[int(h/8):int(h/6.5), int(w/8):int(w/2.0)]

        id = parse_text(idimg, config="--psm 7 -c tessedit_char_whitelist=#0123456789", process=False)

        if "#" in id:
            id = id.replace("#", "")

        return id

    info["energy"] = get_energy()
    info["nftId"]  = get_id()
 