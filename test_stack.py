import numpy as np
import pandas as pd
import tensorflow as tf
import matplotlib.pyplot as plt

print("✅ Environment test starting...\n")

# --- NumPy Test ---
arr = np.array([[1, 2, 3], [4, 5, 6]])
print("NumPy working! Mean:", np.mean(arr))

# --- Pandas Test ---
df = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})
print("Pandas working! Sum of B:", df["B"].sum())

# --- TensorFlow Test ---
print("TensorFlow version:", tf.__version__)
a = tf.constant(3)
b = tf.constant(5)
print("TensorFlow addition result:", tf.add(a, b).numpy())

# --- Matplotlib Test ---
plt.plot([0, 1, 2], [2, 3, 5])
plt.title("Matplotlib OK")
plt.xlabel("X")
plt.ylabel("Y")
plt.show()

print("\n✅ All core libraries are working correctly!")
