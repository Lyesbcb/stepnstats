import easyocr
import cv2
from matplotlib import pyplot as plt
import numpy as np
import warnings
from resize import resize

# Remove Warning because easyocr have some issue
warnings.filterwarnings("ignore", category=UserWarning) 

def get_quantity(img):
    # Resize image to quickly do the code
    img = cv2.cvtColor(img, cv2.THRESH_BINARY)
    reader = easyocr.Reader(['en'], gpu=False, verbose=False)
    result = reader.readtext(img, paragraph="False")
    text_result = []
    for text in result:
        if text[-1][1:] != "": 
            return text[-1][1:]
        else:
            return "1"
