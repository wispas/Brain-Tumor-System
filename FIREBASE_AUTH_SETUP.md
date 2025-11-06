# 🔐 Firebase Authentication Setup Guide

This guide explains how to integrate Firebase authentication into your Brain Tumor System project.

## 📦 Installation

First, install the Firebase package:

```bash
npm install
```

This will install Firebase (already added to `package.json`).

## 📁 Files Created

The following files have been created for Firebase authentication:

### 1. **Firebase Configuration**
- `src/config/firebase.ts` - Firebase app initialization and auth/db exports

### 2. **Authentication Context**
- `src/contexts/AuthContext.tsx` - React context for managing auth state
  - Provides: `currentUser`, `login`, `signup`, `logout`, `resetPassword`, `loading`

### 3. **Authentication Components**
- `src/components/auth/Login.tsx` - Login page with email/password
- `src/components/auth/ForgotPassword.tsx` - Password reset page
- `src/components/auth/ProtectedRoute.tsx` - Route wrapper that requires authentication

### 4. **Example Integration**
- `src/AppWithAuth.tsx` - Example showing how to integrate auth (reference only)

## 🚀 Integration Steps

### Step 1: Wrap App with AuthProvider

Update `src/index.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

### Step 2: Update App.tsx Routes

Update `src/App.tsx` to include login and forgot-password routes, and protect existing routes:

```tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// ... your existing imports

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {/* Your existing layout with Sidebar, Header, MainContent */}
            </ProtectedRoute>
          }
        />
        {/* ... wrap other routes similarly */}
      </Routes>
    </Router>
  );
};
```

See `src/AppWithAuth.tsx` for a complete example.

### Step 3: Add Logout Functionality (Optional)

Add a logout button to your Header or Sidebar component:

```tsx
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header>
      {/* ... existing header content */}
      {currentUser && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </header>
  );
};
```

## 🔑 Features

### ✅ Email/Password Authentication
- Login with email and password
- Sign up (via AuthContext, can be added to a signup page)
- Secure password reset via email

### ✅ Protected Routes
- All routes are protected by default
- Unauthenticated users are redirected to login
- Loading state while checking authentication

### ✅ User State Management
- Global auth state via React Context
- Automatic auth state persistence
- Loading states for better UX

## 📝 Usage Examples

### Using Auth in Components

```tsx
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      {currentUser && (
        <p>Welcome, {currentUser.email}!</p>
      )}
    </div>
  );
};
```

### Manual Login (if needed)

```tsx
const { login } = useAuth();

try {
  await login('user@example.com', 'password123');
  // User is now logged in
} catch (error) {
  console.error('Login failed:', error);
}
```

## 🔒 Security Notes

1. **Firebase handles authentication** - No passwords are stored in your app
2. **Protected routes** - Users must be authenticated to access main app
3. **Password reset** - Sends secure reset link via Firebase email service
4. **Session persistence** - Firebase automatically handles session management

## 🎨 Customization

All components use Tailwind CSS and can be easily customized:
- Modify styles in the component files
- Update colors, spacing, or layout as needed
- Add additional form fields or validation

## 🚨 Important

- **No existing files were modified** - All new files are separate
- **Gradual integration** - Follow the steps above when ready
- **Firebase config** - Uses your existing Firebase project credentials
- **Test thoroughly** - Test login, logout, and password reset flows

## 📚 Next Steps

1. Install dependencies: `npm install`
2. Follow integration steps above
3. Test authentication flow
4. Customize UI as needed
5. Add signup page if needed (use `signup` from AuthContext)

---

**Need help?** Check `src/AppWithAuth.tsx` for a complete integration example.

