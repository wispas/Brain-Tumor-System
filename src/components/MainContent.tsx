import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const MainContent: React.FC = () => {
  const navigate = useNavigate();
  const { userData, loading } = useAuth();

  // Get user's name or fallback to email or "User"
  const displayName = userData?.name || userData?.email?.split('@')[0] || 'User';

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Content */}
        <div className="w-full lg:max-w-xl order-2 lg:order-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center lg:text-left">
            <span className="text-orange-500">Hello:</span>
            <span className="text-blue-600"> {loading ? '...' : displayName}</span>
          </h2>

          {/* Manual Diagnosis Card */}
          <div className="mt-6 sm:mt-8 lg:mt-10 p-4 sm:p-6 bg-gray-100 rounded-xl shadow flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="text-blue-600 text-2xl sm:text-3xl font-bold flex-shrink-0 mx-auto sm:mx-0">
              +
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                Manual Diagnosis
              </h4>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Collect complete patient data and upload relevant diagnostic images (MRI/CT) for intelligent analysis.
              </p>
              <button
                onClick={() => navigate("/test")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition shadow-lg w-full sm:w-auto text-sm sm:text-base"
              >
                Patient Diagnosis
              </button>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-auto order-1 lg:order-2 flex justify-center">
          <img 
            src="/images/doctor-illustration.png" 
            alt="Doctor" 
            className="w-48 sm:w-64 lg:w-80 xl:w-96 max-w-full h-auto"
          />
        </div>
      </div>

      {/* Additional responsive sections can be added here */}
      <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* You can add more feature cards here for larger screens */}
      </div>
    </main>
  );
};

export default MainContent;