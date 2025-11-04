import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import TestForm from "./components/TestForm";
import UploadPage from "./components/UploadPage";
import ResultPage from "./components/Result";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex bg-gray-100 min-h-screen text-gray-800">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Section */}
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/test" element={<TestForm />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
