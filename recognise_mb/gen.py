import cv2
from get_items_from_screen import get_items_from_screen
from compare_shape import compare_image
from skimage.metrics import structural_similarity

results = get_items_from_screen("./input/screens/open_mb/lvl2/image_44.png")
array = []
array2 = []
paths = [
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

# for path in paths:
#     img = cv2.imread(path, 0)
#     img_gray = cv2.cvtColor(results[2], cv2.COLOR_BGR2GRAY)
#     array.append(compare_image(img_gray, img))
#     array2.append(path)
    

# index_min = min(range(len(array)), key=array.__getitem__)

# print(array2[index_min])
# img1 = cv2.imread("./input/gem/resilience/lvl3.png", 0)

for result in results:
    cv2.imshow("result", result[0])
    cv2.waitKey(0)
    print(result[1])
# print(compare_image(img1, img2))