import cv2
# crop_img = src_img[h_start : h_end, w_start : w_end]

def crop_bottom_half(img):
    cropped_img = img[int(img.shape[0]/2):int(img.shape[0])]
    cropped_img = crop_home_button(cropped_img)
    return cropped_img

def crop_bottom_half_and_top_half(img):
    cropped_img = img[int(img.shape[0]/2):int(img.shape[0]),int(img.shape[1]/2):int(img.shape[1])]
    return cropped_img

def crop_home_button(img):
    cropped_img = img[0:int(int(img.shape[0])*0.9)]
    return cropped_img