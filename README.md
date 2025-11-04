# 🧠 Brain Tumor Detection

This project is a full-stack web app for brain tumor detection using deep learning.  
It has a **Flask backend** for model prediction and a **React frontend** for the user interface.

---

## 🔹 Backend (Flask)

### Steps to run:
1. Open the `backend` folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   venv\Scripts\activate   # on Windows
   source venv/bin/activate   # on macOS/Linux
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask app:
   ```bash
   python app.py
   ```

The backend will start on **http://127.0.0.1:5000**

---

## 🔹 Frontend (React + TypeScript)

### Steps to run:
1. Open the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on **http://localhost:5173**

---

## ⚙️ API Connection

Make sure the API endpoint in your React file (`UploadPage.tsx`) matches your backend URL:
```ts
fetch("http://127.0.0.1:5000/api/upload", { ... })
```

---

## 📁 Project Structure
```
brain-tumor-detection/
│
├── backend/
│   ├── app.py
│   ├── static/uploads/
│   ├── model/
│   └── requirements.txt
│
├── frontend/
│   ├── src/UploadPage.tsx
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---



