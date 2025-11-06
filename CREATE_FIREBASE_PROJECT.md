# 🔥 Create Firebase Project - Step by Step Guide

## Step 1: Create Project in Firebase Console

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Create a New Project**
   - Click **"Add project"** or **"Create a project"**
   - Enter project name: `brain-tumor-system` (or any name you prefer)
   - Click **Continue**

3. **Configure Google Analytics (Optional)**
   - Choose whether to enable Google Analytics
   - If enabled, select or create an Analytics account
   - Click **Continue** → **Create project**
   - Wait for project creation (takes ~30 seconds)
   - Click **Continue** when done

## Step 2: Register Your Web App

1. **Add Web App to Project**
   - In your Firebase project dashboard, click the **Web icon** (`</>`)
   - Or go to **Project Settings** → **Your apps** → **Add app** → Select **Web**

2. **Register App**
   - App nickname: `Brain Tumor System` (or any name)
   - **Check** "Also set up Firebase Hosting" (optional, but recommended)
   - Click **Register app**

3. **Copy Firebase Configuration**
   - You'll see your Firebase config object
   - It looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```
   - **Copy this entire config** - you'll need it in the next step

## Step 3: Update Your Project Configuration

After getting your Firebase config, update the files:

### Update `src/config/firebase.ts`

Replace the config object with your new Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Update `.firebaserc`

Replace the project ID with your new project ID:

```json
{
  "projects": {
    "default": "YOUR_PROJECT_ID"
  }
}
```

## Step 4: Enable Authentication

1. **In Firebase Console**, go to:
   - **Authentication** (left sidebar)
   - Click **Get Started**

2. **Enable Email/Password Authentication**
   - Click on **Email/Password**
   - Toggle **Enable** (first option)
   - Click **Save**

3. **Optional: Enable Email Link (Passwordless)**
   - If you want passwordless login, enable this too
   - Click **Save**

## Step 5: Enable Firestore Database (Optional but Recommended)

1. **In Firebase Console**, go to:
   - **Firestore Database** (left sidebar)
   - Click **Create Database**

2. **Choose Database Mode**
   - Select **Start in test mode** (for development)
   - Or **Start in production mode** (uses the rules we created)

3. **Select Location**
   - Choose a location closest to your users
   - Click **Enable**

4. **Deploy Firestore Rules** (when ready)
   ```bash
   firebase deploy --only firestore:rules
   ```

## Step 6: Link Your Local Project

After creating the project, link it to your local project:

```bash
firebase use --add
```

- Select your project from the list
- Set it as the default project

Or manually set it:
```bash
firebase use YOUR_PROJECT_ID
```

## Step 7: Verify Configuration

1. **Check your project is linked:**
   ```bash
   firebase use
   ```

2. **List your projects:**
   ```bash
   firebase projects:list
   ```

## ✅ Quick Checklist

- [ ] Firebase project created in console
- [ ] Web app registered and config copied
- [ ] `src/config/firebase.ts` updated with new config
- [ ] `.firebaserc` updated with new project ID
- [ ] Authentication enabled (Email/Password)
- [ ] Firestore enabled (optional)
- [ ] Local project linked to Firebase project

## 🚨 Important Notes

1. **Project ID is unique** - If `brain-tumor-system` is taken, Firebase will suggest an alternative
2. **Keep your config secure** - Don't commit sensitive keys to public repos
3. **Test the connection** - After updating config, test authentication in your app

## 📝 After Setup

Once everything is configured:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Test Firebase connection:**
   - Try to sign up a new user
   - Check Firebase Console → Authentication → Users tab

3. **Deploy rules** (when ready):
   ```bash
   firebase deploy --only firestore:rules
   ```

---

**Need Help?** Check the Firebase Console dashboard for your project status and any setup reminders.

