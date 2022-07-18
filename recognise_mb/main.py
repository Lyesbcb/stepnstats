import cv2
from get_mb_content_from_image import get_mb_content_from_image
from time_execution import *
start()
path = "input\screens\open_mb\lvl4\mb1.png"
img = cv2.imread(path)

print(get_mb_content_from_image(img))
stop()