import tensorflow as tf
filenames = tf.constant(
    [
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
        "./input/gst.png",
    ]
)
labels = tf.constant(
    [
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
        "./input/gst.png",
    ]
)
tf.compat.v1.disable_eager_execution()
tf.compat.v1.disable_v2_behavior()

# filename_queue = tf.train.string_input_producer(filenames)

# reader = tf.WholeFileReader()
# filename, content = reader.read(filename_queue)
# image = tf.image.decode_png(content, channels=3)
# image = tf.cast(image, tf.float32)
# resized_image = tf.image.resize_images(image, [224, 224])
# image_batch = tf.train.batch([resized_image], batch_size=8)
dataset = tf.data.Dataset.from_tensor_slices((filenames, labels))

def _parse_function(filename, label):
  image_string = tf.io.read_file(filename)
  image_decoded = tf.image.decode_png(image_string, channels=3)
  image = tf.cast(image_decoded, tf.float32)
  return image, label

dataset = dataset.map(_parse_function)
dataset = dataset.batch(2)

iterator = tf.compat.v1.data.make_one_shot_iterator(dataset)
images, labels = iterator.get_next()

sess = tf.compat.v1.Session()
sess.run([images, labels])