import easyocr
import cv2
from matplotlib import pyplot as plt
import numpy as np
import warnings
from resize import resize

# Remove Warning because easyocr have some warning and we don't want to have it in the logs
warnings.filterwarnings("ignore", category=UserWarning)


def get_quantity(img):
    # Resize image to quickly do the code
    height, width, channels = img.shape
    img = cv2.cvtColor(img[int(height/1.5):height, int(width/1.5):width], cv2.COLOR_BGR2GRAY)
    reader = easyocr.Reader(['en'], gpu=True, verbose=False)
    result = reader.readtext(img, detail=0, paragraph="False", allowlist="0123456789.")
    for text in result:
        if text != "":
            return text.replace(" ", "")[1:]
        else:
            return "1"
