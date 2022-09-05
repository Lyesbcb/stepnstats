import cv2 as cv
import numpy as np
from mse import cmse
import os
from sys import argv
import sys
from gifs import get_items_from_screen as get_items
from trim import trim
from pathlib import Path
from get_mblvl import get_mblvl

# FILES FORMATS
formats = (".png", ".jpg", ".jpeg")
# List of all contents paths
contents = [file for file in os.listdir("./python/to_recognize/")]
if __name__ == "__main__":
    # Extract the items from the test file
    items = get_items("./"+sys.argv[1])
    mbLvl = get_mblvl(cv.imread("./"+sys.argv[1]))
    json = {}
    # Iterate over the extracted items
    for index, item in enumerate(items):
        if item[1] == None:
            resultQuantity = "1"
        else:
            resultQuantity = item[1]
        # Remove all top-bottom-left-right white spaces
        item = cv.cvtColor(item[0], cv.COLOR_BGR2BGRA)
        item = trim(item)
        # Convert to gray for faster comparison
        gitem = item
        ih, iw = item.shape[:2]
        matches = []
        # Iterate over the contents in "to_recognize/" folder
        for content in contents:
            dfn = "./python/to_recognize/{}".format(content)
            trcg = cv.imread(dfn, -1)
            # Replace transparent pixels with white
            mask = trcg == (76, 112, 71, 0)
            trcg[mask] = 255
            # Remove trailing white spaces(top-bottom-left-right)
            trcg = trim(trcg)
            # Resize the content image to match the item size
            trcg = cv.resize(trcg, (iw, ih))
            gtrcg = trcg
            h, w = trcg.shape[:2]
            area = h * w
            # Error threshold, anything higher than this is considered not a match
            threshold = area * 0.275 * 6  # old 0.275

            # Calculate the mean squared difference
            # and only append the results with low error
            diff = cmse(gtrcg, gitem)
            if diff < threshold:
                # append file name and error value tuple to matches
                matches.append((dfn, diff))
        # Iterate over the scrolls in "to_recognize/" folder
        if matches != []:
            # sort the matches with the lowest error first
            # and select the first one as best match
            best_match = list(sorted(matches, key=lambda ms: ms[1]))[0]
            # Read the original(colored) diamond image
            bmimg = cv.imread(best_match[0], -1)
            result = Path(best_match[0]).stem
            contentWithNb = "content" + str(index + 1)
            quantityWithNb = contentWithNb + "Quantity"

            json.update(
                {contentWithNb: result, quantityWithNb: resultQuantity, "lvl": mbLvl})
    print(json)
