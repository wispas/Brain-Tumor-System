import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { to: "/", label: "Home", icon: "fa-home" },
    { to: "/test", label: "Test Form", icon: "fa-clipboard" },
    { to: "/upload", label: "Upload", icon: "fa-cloud-upload-alt" },
    { to: "/records", label: "Patient Records", icon: "fa-folder-open" },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-900 text-white p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-lg text-white"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold">Profile</h2>
              <p className="text-green-400 text-xs">Online</p>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-lg`}></i>
          </button>
        </div>

        {/* Mobile User Email */}
        {currentUser && (
          <p className="text-gray-400 text-xs mt-2 truncate">
            {currentUser.email}
          </p>
        )}
      </div>

      {/* Sidebar - Hidden on mobile by default */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gray-900 text-gray-100 flex flex-col justify-between p-6
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:translate-x-0
      `}>
        {/* Close button for mobile */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <i className="fas fa-times text-lg"></i>
        </button>

        <div>
          {/* Desktop Profile Section */}
          <div className="hidden lg:block text-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <i className="fas fa-user text-2xl text-white"></i>
            </div>
            <h2 className="text-xl font-bold text-white">Profile</h2>
            {currentUser && (
              <p className="text-gray-400 text-xs mt-1 truncate px-2">
                {currentUser.email}
              </p>
            )}
            <p className="text-green-400 text-sm mt-1">Online</p>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.to;
                const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm lg:text-base";
                const activeClasses = "bg-blue-600 text-white shadow";
                const inactiveClasses = "hover:bg-gray-800 hover:text-white text-gray-200";

                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                    >
                      <i className={`fas ${item.icon} w-5 text-center`}></i>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Footer Section */}
        <div className="mt-auto border-t border-gray-700 pt-4">
          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all mb-4 text-sm lg:text-base"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Sign Out</span>
          </button>

          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-500 text-xs text-center lg:text-left">
              © 2025 Medical Assistant
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;