import numpy as np


def get_lastwhite(img, x, y, key):
    """
    Image, int | None, int | None, str
    Return the last white column or row index
    key -> key[0] == "x" -> go along the x axis (columns)
           key[0] == "y" -> go along the y axis (rows)
           key[1] == "+" -> increase given axis value with every iteration
           key[1] == "-" -> decrease given axis value with every iteration
    """

    # Check and return if the selected axis has non-white pixels
    if key[0] == "x":
        if False in (img[:,x] == (255, 255, 255, 255)):
            for i in range(1, img.shape[1] // 3):
                if (False in (img[:,x + 
                    (-i if key[1] == "-" else i)] == (255, 255, 255, 255))):
                    pass
                else:
                    break
            else:
                return x
    else:
        if False in (img[y,:] == (255, 255, 255, 255)):
            return y
        
    # Rescursion: increase axis and call "get_lastwhite" again when the line is white
    match key:
        case "x+":
            return get_lastwhite(img, x+1, y, key) 
        case "x-":
            return get_lastwhite(img, x-1, y, key) 
        case "y+":
            return get_lastwhite(img, x, y+1, key) 
        case "y-":
            return get_lastwhite(img, x, y-1, key) 

def trim(img):
    """
    Image -> Image
    Trim white pixels padding in given image
    """

    left_x   = get_lastwhite(img, x=0 , y=None, key="x+")
    right_x  = get_lastwhite(img, x=-1, y=None, key="x-")
    top_y    = get_lastwhite(img, x=None, y=0 , key="y+")
    bottom_y = get_lastwhite(img, x=None, y=-1, key="y-")

    return img[top_y+1:bottom_y, left_x+1:right_x]

