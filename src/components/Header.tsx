import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-bold rounded-full">
          +
        </div>
        <span className="font-bold text-xl text-blue-700">LOGO</span>
      </div>

      <nav>
        <ul className="flex gap-6 text-gray-700">
          <li><a href="#" className="hover:text-blue-600">Home</a></li>
          <li><a href="#" className="hover:text-blue-600">Dashboard</a></li>
          <li><a href="#" className="hover:text-blue-600">Patients Records</a></li>
          <li><a href="#" className="hover:text-blue-600">Doctors</a></li>
          <li><a href="#" className="hover:text-blue-600">Emergency Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
