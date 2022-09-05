import cv2 as cv
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)
# Image, Image, String, Float -> Point, Int|None, Int
# Match given template temp with the sliding windows
# using template matching method "method"
# through the bigger image scene
# and return the best match and its score
#   if the score was not under given thresh
#   else return None and best score
def best_match(temp, scene, method, thresh=None):
    diff = "DIFF" in method
    method = eval(method)

    result = cv.matchTemplate(scene, temp, method)

    minVal, maxVal, minLoc, maxLoc = cv.minMaxLoc(result)

    if diff:
        rev = minLoc, minVal 
        cmp = lambda v, t: v < t
    else:
        rev = maxLoc, maxVal
        cmp = lambda v, t: v > t


    return (rev if (thresh is None or cmp(rev[1], thresh))
                else (None, rev[1]))
        
