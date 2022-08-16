from tkinter import image_names
import cv2 as cv
from pytesseract import image_to_string
import pytesseract


def parse_text(img, config="", process=True, gray=False):
    if process:
        gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY) if not gray else img
        _, dst = cv.threshold(gray, 0, 255, cv.THRESH_OTSU)
    else:
        dst = img 

    ptxt = image_to_string(dst, lang='eng', config=config) #, config="--psm 7 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    ptxt = ptxt.replace('\n', '')

    return ptxt

