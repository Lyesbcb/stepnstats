import easyocr
import cv2
from matplotlib import pyplot as plt
import numpy as np
import warnings
from resize import resize

# Remove Warning because easyocr have some issue
warnings.filterwarnings("ignore", category=UserWarning) 

def get_text_from_run_screen(img):
    # Resize image to quickly do the code
    img = resize(cv2.cvtColor(img, cv2.COLOR_BGR2LAB), 50)

    reader = easyocr.Reader(['en'])
    result = reader.readtext(img, paragraph="False")
    text_result = []
    for text in result:
        text_result.append(text[-1])
    # If you want to see the recognition
    # spacer = 100
    # font = cv2.FONT_HERSHEY_SIMPLEX
    # for detection in result: 
    #     top_left = tuple(detection[0][0])
    #     bottom_right = tuple(detection[0][2])
    #     text = detection[1]
    #     img = cv2.rectangle(img,top_left,bottom_right,(0,255,0),3)
    #     img = cv2.putText(img,text,(20,spacer), font, 0.5,(0,255,0),2,cv2.LINE_AA)
    #     spacer+=15

    # plt.figure(figsize=(10,10))
    # plt.imsave("output.png", img)
    return text_result