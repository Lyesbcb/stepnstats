from skimage import io
import numpy as np
 
def closest_value(input_list, input_value):
 
  arr = np.asarray(input_list)
 
  i = (np.abs(arr - input_value)).argmin()
 
  return arr[i]
 
list=[]
img1 = io.imread('./res.png')
img2 = io.imread('./input/gem/resilience/lvl1.png')
img3 = io.imread('./input/gem/resilience/lvl2.png')
img4 = io.imread('./input/gem/resilience/lvl3.png')
img5 = io.imread('./input/gem/resilience/lvl4.png')
img6 = io.imread('./input/gem/resilience/lvl5.png')
img7 = io.imread('./input/gem/resilience/lvl6.png')
img8 = io.imread('./input/gem/resilience/lvl7.png')
img9 = io.imread('./input/gem/resilience/lvl8.png')
img10 = io.imread('./input/gem/resilience/lvl9.png')

average1 = img1.mean(axis=0).mean(axis=0)
average2 = img2.mean(axis=0).mean(axis=0)
average3 = img3.mean(axis=0).mean(axis=0)
average4 = img4.mean(axis=0).mean(axis=0)
average5 = img5.mean(axis=0).mean(axis=0)
average6 = img6.mean(axis=0).mean(axis=0)
average7 = img7.mean(axis=0).mean(axis=0)
average8 = img8.mean(axis=0).mean(axis=0)
average9 = img9.mean(axis=0).mean(axis=0)
average10 = img10.mean(axis=0).mean(axis=0)

for i in [average2, average3, average4, average5, average6, average7, average8, average9, average10]:
  print((i[0]+i[1]+i[2])/3)
  list.append((i[0]+i[1]+i[2])/3)
    
print("test image: ")
print(average1)
print((average1[0]+average1[1]+average1[2])/3)
# print(closest_value(list, (average1[0]+average1[1]+average1[2])/3))
