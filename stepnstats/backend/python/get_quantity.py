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
    img = cv2.cvtColor(img[int(height/1.3):height, int(width/1.4):width], cv2.COLOR_BGR2GRAY)
    # cv2.imshow("test", img)
    # cv2.waitKey(0)
    reader = easyocr.Reader(['en'], gpu=False, verbose=False)
    result = reader.readtext(img, detail=0, paragraph="False", allowlist="0123456789.xX")
    # print(result)
    for text in result:
        text = text.replace("x", "")
        text = text.replace("X", "")
        if text.isnumeric():
            return text.replace(" ", "")
        else:
            return "1"
