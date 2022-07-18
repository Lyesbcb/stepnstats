import cv2
from get_items_from_screen import get_items_from_screen
# from get_text_from_run_screen import get_text_from_run_screen
# from get_mb_lvl_from_image import get_mb_lvl_from_image
# from test import test
from skimage.metrics import structural_similarity

path = './test.png'
main = cv2.imread(path)
results = get_items_from_screen("./input/screens/open_mb/lvl7/mb1.png")
array = []
array2 = []
files = [
    "./input/gem/luck/lvl1.png",
    "./input/gem/luck/lvl2.png",
    "./input/gem/luck/lvl3.png",
    "./input/gem/luck/lvl4.png",
    "./input/gem/luck/lvl5.png",
    "./input/gem/luck/lvl6.png",
    "./input/gem/luck/lvl7.png",
    "./input/gem/luck/lvl8.png",
    "./input/gem/luck/lvl9.png",
    "./input/gem/comfort/lvl1.png",
    "./input/gem/comfort/lvl2.png",
    "./input/gem/comfort/lvl3.png",
    "./input/gem/comfort/lvl4.png",
    "./input/gem/comfort/lvl5.png",
    "./input/gem/comfort/lvl6.png",
    "./input/gem/comfort/lvl7.png",
    "./input/gem/comfort/lvl8.png",
    "./input/gem/comfort/lvl9.png",
    "./input/gem/efficiency/lvl1.png",
    "./input/gem/efficiency/lvl2.png",
    "./input/gem/efficiency/lvl3.png",
    "./input/gem/efficiency/lvl4.png",
    "./input/gem/efficiency/lvl5.png",
    "./input/gem/efficiency/lvl6.png",
    "./input/gem/efficiency/lvl7.png",
    "./input/gem/efficiency/lvl8.png",
    "./input/gem/efficiency/lvl9.png",
    "./input/gem/resilience/lvl1.png",
    "./input/gem/resilience/lvl2.png",
    "./input/gem/resilience/lvl3.png",
    "./input/gem/resilience/lvl4.png",
    "./input/gem/resilience/lvl5.png",
    "./input/gem/resilience/lvl6.png",
    "./input/gem/resilience/lvl7.png",
    "./input/gem/resilience/lvl8.png",
    "./input/gem/resilience/lvl9.png",
    "./input/scroll/common.png",
    "./input/scroll/uncommon.png",
    "./input/scroll/rare.png",
    "./input/scroll/epic.png",
    "./input/scroll/legendary.png",
    "./input/gst.png"
]

cv2.imwrite("test2.png", results[1])
