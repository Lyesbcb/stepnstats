import cv2

def crop_bottom_half(img):
    cropped_img = img[int(img.shape[0]/2):int(img.shape[0])]
    return cropped_img

def crop_bottom_half_and_top_half(img):
    cropped_img = img[int(img.shape[0]/2):int(img.shape[0]),int(img.shape[1]/2):int(img.shape[1])]
    return cropped_img