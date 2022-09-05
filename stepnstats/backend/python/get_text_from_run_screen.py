from ast import For
from datetime import date
from pickle import FALSE, TRUE
import easyocr
import cv2
from matplotlib import pyplot as plt
import numpy as np
import warnings
from resize import resize
import re

# Remove Warning because easyocr have some issue
warnings.filterwarnings("ignore", category=UserWarning)


def get_text_from_run_screen(img):
    kernel = np.ones((1, 1), np.uint8)
    # Resize image to quickly do the code
    im_gray = resize(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY), 50)
    img = cv2.erode(im_gray, kernel, iterations=1)
    reader = easyocr.Reader(["en"])
    result = reader.readtext(img, paragraph="False")
    text_result = []
    for text in result:
        text_result.append(text[-1])
    # If you want to see the recognition
    spacer = 100
    font = cv2.FONT_HERSHEY_SIMPLEX
    for detection in result:
        top_left = tuple(detection[0][0])
        bottom_right = tuple(detection[0][2])
        text = detection[1]
        img = cv2.rectangle(img, top_left, bottom_right, (0, 255, 0), 3)
        img = cv2.putText(
            img, text, (20, spacer), font, 0.5, (0, 255, 0), 2, cv2.LINE_AA
        )
        spacer += 15

    plt.figure(figsize=(10, 10))
    # cv2.imshow("result", img)
    # cv2.waitKey(0)
    return extract_text_and_return_json((" ".join(text_result)).upper())


def extract_text_and_return_json(text):
    print(text)
    gst = re.findall("\+ ([0-9O]+\.)([0-9O]+)?", text)
    dateTime = re.findall(
        "([0-9O]{2})/([0-9O]{2})/([0-9O]{4}) ([0-9O]{2})(.|:)([0-9O]{2})", text
    )
    duration = re.findall("([0-9O]{2})(\.|:)([0-9O]{2})(\.|:)([0-9O]{2})", text)
    energy = re.findall(" [0-9O]+\.[0-9O] ", text)
    type = ""
    if re.findall("JOGGER", text):
        type = re.findall("JOGGER", text)
    if re.findall("RUNNER", text):
        type = re.findall("RUNNER", text)
    if re.findall("WALKER", text):
        type = re.findall("WALKER", text)
    if re.findall("TRAINER", text):
        type = re.findall("TRAINER", text)
    lvl = re.findall("LV([0-9O]+)", text)
    km = re.findall("([0-9O]+\.)?([0-9O]+) KM", text)
    steps = re.findall(" [0-9O]+ ", text)
    nftId = re.findall("([0-9O]{9})", text)
    durabilityLost = re.findall("- [0-9O]+", text)
    durability = re.findall("[0-9O]+( \/|\)) [0-9O]+", text)
    print(durability)
    misteryBox = 0
    if re.findall("X[0-9O]{1}", text):
        misteryBox = 1
    duration = duration[0][0] + ":" + duration[0][2] + ":" + duration[0][4]
    dateTime = dateTime[0][2] + "-" + dateTime[0][1] + "-" + dateTime[0][0] + " " + dateTime[0][3] + ":" + dateTime[0][5] + ":00"
    gst = gst[0][0] + gst[0][1]
    energy = energy[0][1:]
    type = type[0]
    lvl = lvl[0]
    km = km[0][0] + km[0][1]
    steps = steps[1][1:]
    nftId = nftId[0]
    durability = durability[0][:2]
    misteryBox = misteryBox
    print(dateTime)
    print(duration)
    print(gst)
    print(energy)
    print(type)
    print(lvl)
    print(km)
    print(steps)
    print(nftId)
    print(durabilityLost)
    print(durability)
    print(misteryBox)