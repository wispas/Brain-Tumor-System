import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Header: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-bold rounded-full">
          +
        </div>
        <span className="font-bold text-xl text-blue-700">LOGO</span>
      </div>

      <nav className="flex items-center gap-6">
        <ul className="flex gap-6 text-gray-700">
          <li><a href="#" className="hover:text-blue-600">Home</a></li>
          <li><a href="#" className="hover:text-blue-600">Dashboard</a></li>
          <li><a href="#" className="hover:text-blue-600">Patients Records</a></li>
          <li><a href="#" className="hover:text-blue-600">Doctors</a></li>
          <li><a href="#" className="hover:text-blue-600">Emergency Contact</a></li>
        </ul>
        
        {currentUser && (
          <div className="flex items-center gap-3 border-l pl-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white text-xs"></i>
              </div>
              <span className="text-sm text-gray-600 max-w-[200px] truncate">
                {currentUser.email}
              </span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
