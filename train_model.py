import os
import PIL
from PIL import UnidentifiedImageError
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
import matplotlib.pyplot as plt

# -----------------------------
# 🩺 Safe image loading patch (fully effective)
# -----------------------------
from keras.src.legacy.preprocessing import image as legacy_image

def safe_load_img(path, *args, **kwargs):
    try:
        return PIL.Image.open(path)
    except UnidentifiedImageError:
        print(f"⚠️ Skipping corrupted image: {path}")
        return None

legacy_image.load_img = safe_load_img  # override internal loader

# -----------------------------
# 🧠 Dataset setup
# -----------------------------
train_dir = "dataset/Training"
test_dir = "dataset/Testing"

img_height, img_width = 150, 150
batch_size = 32

train_datagen = ImageDataGenerator(
    rescale=1.0 / 255,
    rotation_range=20,
    zoom_range=0.2,
    horizontal_flip=True,
)

test_datagen = ImageDataGenerator(rescale=1.0 / 255)

# Custom generator to skip None images
def safe_flow_from_directory(datagen, directory, **kwargs):
    gen = datagen.flow_from_directory(directory, **kwargs)
    while True:
        try:
            batch_x, batch_y = next(gen)
            # Skip batch if contains NaNs (caused by broken images)
            if np.any(np.isnan(batch_x)):
                continue
            yield batch_x, batch_y
        except Exception as e:
            print(f"⚠️ Skipping batch due to error: {e}")
            continue

train_data = safe_flow_from_directory(
    train_datagen,
    train_dir,
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode="categorical",
)

test_data = safe_flow_from_directory(
    test_datagen,
    test_dir,
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode="categorical",
)

# -----------------------------
# 🧩 CNN model
# -----------------------------
model = Sequential([
    keras.Input(shape=(img_height, img_width, 3)),
    Conv2D(32, (3, 3), activation="relu"),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation="relu"),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(128, activation="relu"),
    Dropout(0.3),
    Dense(4, activation="softmax")  # assuming 4 classes
])

model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

model.summary()

# -----------------------------
# 🚀 Train the model
# -----------------------------
history = model.fit(
    train_data,
    epochs=10,
    validation_data=test_data,
    steps_per_epoch=180,   # can be adjusted
    validation_steps=25,
)

# -----------------------------
# 💾 Save model
# -----------------------------
os.makedirs("models", exist_ok=True)
model.save("models/medical_model.h5")
print("✅ Model saved as 'models/medical_model.h5'")

# -----------------------------
# 📊 Plot training results
# -----------------------------
plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label="Train Accuracy")
plt.plot(history.history['val_accuracy'], label="Validation Accuracy")
plt.title("Model Accuracy")
plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label="Train Loss")
plt.plot(history.history['val_loss'], label="Validation Loss")
plt.title("Model Loss")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.legend()

plt.tight_layout()
plt.savefig("training_results.png")
plt.show()

print("📈 Training complete. Graph saved as 'training_results.png'")
