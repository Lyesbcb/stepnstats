from skimage import io
import numpy as np
 
def closest_value(input_list, input_value):
 
  arr = np.asarray(input_list)
 
  i = (np.abs(arr - input_value)).argmin()
 
  return arr[i]

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
images = []
average = []



for path in paths:
  image = io.imread(path)
  images.append(image)
  image_colors = image.mean(axis=0).mean(axis=0)
  average_color= (image_colors[0]+image_colors[1]+image_colors[2])/3
  average.append(average_color)
  print(path + " :")
  print(average_color)
