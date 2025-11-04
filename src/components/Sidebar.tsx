import React from "react";
import { Link } from "react-router-dom";


const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col justify-between p-6">
      <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Profile</h2>
          <p className="text-green-400 text-sm">Online</p>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
                <Link
                    to="/"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all"
                >
                    <i className="fas fa-home"></i> Home
                </Link>
            </li>

            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all"
                >
                <i className="fas fa-info-circle"></i> Dashboard
                </Link>

            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all">
                <i className="fas fa-stethoscope"></i> Patient Records
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all">
                <i className="fas fa-user-md"></i> Doctors
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all">
                <i className="fas fa-envelope"></i> Emergency Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4">
        <h4 className="text-lg font-semibold mb-2">Subscribe for updates</h4>
        <form className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-2 rounded text-sm font-semibold"
          >
            Subscribe
          </button>
        </form>
        <p className="text-gray-500 text-xs mt-4">© 2025 Medical Assistant</p>
      </div>
    </aside>
  );
};

export default Sidebar;
