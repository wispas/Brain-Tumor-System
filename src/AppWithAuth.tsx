/**
 * AppWithAuth.tsx - Example integration file
 * 
 * This file shows how to integrate Firebase authentication with your existing App.
 * 
 * TO INTEGRATE:
 * 1. Wrap your App with AuthProvider in src/index.tsx
 * 2. Replace the Routes in your App.tsx with the protected routes shown below
 * 3. Add login and forgot-password routes
 * 
 * IMPORTANT: This file is for reference only. Don't import it directly.
 * Copy the structure into your existing App.tsx when ready.
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import auth components
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Import your existing components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import TestForm from "./components/TestForm";
import UploadPage from "./components/UploadPage";
import ResultPage from "./components/Result";
import Dashboard from "./components/Dashboard";

const AppWithAuth: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes - no authentication required */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected routes - require authentication */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="flex bg-gray-100 min-h-screen text-gray-800">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <div className="flex-1 p-6">
                    <MainContent />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/test"
          element={
            <ProtectedRoute>
              <div className="flex bg-gray-100 min-h-screen text-gray-800">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <div className="flex-1 p-6">
                    <TestForm />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <div className="flex bg-gray-100 min-h-screen text-gray-800">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <div className="flex-1 p-6">
                    <UploadPage />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <div className="flex bg-gray-100 min-h-screen text-gray-800">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <div className="flex-1 p-6">
                    <ResultPage />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="flex bg-gray-100 min-h-screen text-gray-800">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <div className="flex-1 p-6">
                    <Dashboard />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppWithAuth;

