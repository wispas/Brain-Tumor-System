import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np

# Load the trained model
model = tf.keras.models.load_model("brain_tumor_model.h5")

# Path to your test image
img_path = "dataset/testing/glioma_tumor/image(1).jpg"

# Load and preprocess the image
img = image.load_img(img_path, target_size=(150, 150))
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array = img_array / 255.0

# Make prediction
pred = model.predict(img_array)

# Decode class
class_names = ["glioma_tumor", "meningioma_tumor", "no_tumor", "pituitary_tumor"]
predicted_class = class_names[np.argmax(pred)]

print(f"🧠 Predicted: {predicted_class}")
