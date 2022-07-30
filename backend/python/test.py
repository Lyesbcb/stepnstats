from ast import arg
from get_mb_lvl_from_image import get_mb_lvl_from_image
import cv2
from sys import argv

img = cv2.imread(argv[1])
print(get_mb_lvl_from_image(argv[1], "open_mb"))