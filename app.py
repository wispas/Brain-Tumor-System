from flask import Flask, render_template, request, url_for
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

# ----------------------------
# SETUP
# ----------------------------
app = Flask(__name__)

# Folder to store uploads
UPLOAD_FOLDER = os.path.join('static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load your trained model (update path if needed)
MODEL_PATH = os.path.join('brain_tumor_model.h5')  # or use absolute path if not in project root
model = load_model(MODEL_PATH)

# ----------------------------
# ROUTES
# ----------------------------

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login')
def login():
    # Firebase login page
    return render_template('login.html')


@app.route('/signup')
def signup():
    # Firebase signup page
    return render_template('signup.html')


@app.route('/test', methods=['GET', 'POST'])
def test():
    if request.method == 'POST':
        # Collect all form inputs for review or saving
        form_data = request.form.to_dict()
        print("Form data received:", form_data)

        # Display confirmation message on test.html
        return render_template('test.html', message='✅ Test data submitted successfully!')

    return render_template('test.html')


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Check for uploaded file
        file = request.files.get('file')
        if not file or file.filename == '':
            return render_template('upload.html', message='⚠️ No file selected.')

        # Save uploaded file
        filename = file.filename
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Preprocess image for prediction
        img = image.load_img(filepath, target_size=(150, 150))  # Adjust to your training size
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        # Predict tumor type
        prediction = model.predict(img_array)
        print("Prediction output:", prediction)

        # Map output index to class name
        class_labels = ['Glioma Tumor', 'Meningioma Tumor', 'No Tumor', 'Pituitary Tumor']
        predicted_index = np.argmax(prediction[0])
        predicted_label = class_labels[predicted_index]
        confidence = round(float(np.max(prediction[0]) * 100), 2)

        # Render upload page with result
        return render_template(
            'upload.html',
            result=predicted_label,
            confidence=confidence,
            image_url=url_for('static', filename=f'uploads/{filename}')
        )

    return render_template('upload.html')


# ----------------------------
# MAIN ENTRY POINT
# ----------------------------
if __name__ == '__main__':
    app.run(debug=True)
