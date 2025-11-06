# 🚀 Quick Start Guide

## ✅ npm is installed in the project root (correct location)

## 📋 How to Run the Project

### Step 1: Install/Update npm Dependencies
```bash
npm install
```

### Step 2: Start the Frontend (React + Vite)
Open a terminal and run:
```bash
npm run dev
```
This will start the Vite dev server on **http://localhost:5173**

### Step 3: Start the Backend (Flask)
Open a **second terminal** and run:
```bash
python app.py
```
This will start the Flask server on **http://127.0.0.1:5000**

---

## 🎯 Summary

- **Frontend**: `npm run dev` → http://localhost:5173
- **Backend**: `python app.py` → http://127.0.0.1:5000

**Both servers must be running simultaneously!**

---

## 📝 Available npm Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## 🔧 Troubleshooting

If you get PowerShell execution policy errors:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then try running npm commands again.

