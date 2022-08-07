import numpy as np


# Image, Image -> float
# Return the mean squared error between two images
def mse(imga, imgb):
    err = np.sum((imga.astype("float") - imgb.astype("float")) ** 2)
    err /= float(imga.shape[0] * imga.shape[1])

    return err

def cmse(imga, imgb):
    return mse(imga[:,:,0], imgb[:,:,0]) + mse(imga[:,:,1], imgb[:,:,1]) + mse(imga[:,:,2], imgb[:,:,2]) 
