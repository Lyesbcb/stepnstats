from lib2to3.pgen2.token import STRING
from PIL import Image
import glob
import cv2
from get_mb_lvl_from_image import get_mb_lvl_from_image
image_list = []
n = 0
for filename in glob.glob('input/screens/class/*.png'):
    img = cv2.imread(filename)
    lvl = get_mb_lvl_from_image(img, "run")
    path = "./input/screens/run/"
    match lvl:
        case 0:
            cv2.imwrite(path + 'lvl0/image_'+str(n)+'.png', img)
        case 1:
            cv2.imwrite(path + 'lvl1/image_'+str(n)+'.png', img)
        case 2:
            cv2.imwrite(path + 'lvl2/image_'+str(n)+'.png', img)
        case 3:
            cv2.imwrite(path + 'lvl3/image_'+str(n)+'.png', img)
        case 4:
            cv2.imwrite(path + 'lvl4/image_'+str(n)+'.png', img)
        case 5:
            cv2.imwrite(path + 'lvl5/image_'+str(n)+'.png', img)
        case 6:
            cv2.imwrite(path + 'lvl6/image_'+str(n)+'.png', img)
        case 7:
            cv2.imwrite(path + 'lvl7/image_'+str(n)+'.png', img)
        case 8:
            cv2.imwrite(path + 'lvl8/image_'+str(n)+'.png', img)
        case 9:
            cv2.imwrite(path + 'lvl9/image_'+str(n)+'.png', img)
        case 10:
            cv2.imwrite(path + 'lvl10/image_'+str(n)+'.png', img)
    n = n+1
