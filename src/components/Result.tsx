import React from "react";
import { Link } from "react-router-dom";

interface ResultProps {
  patient_name?: string;
  tumor_detected?: string;
  confidence_score?: number;
  recommendation?: string;
}

const Result: React.FC<ResultProps> = ({
  patient_name = "Unknown",
  tumor_detected = "No tumor detected",
  confidence_score = 0,
  recommendation = "Consult a medical expert for further analysis.",
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-8 flex flex-col items-center">
      <header className="flex justify-between w-full max-w-4xl mb-8">
        <h1 className="text-2xl font-bold text-blue-600">
          🧠 Online Medical Assistant
        </h1>
        <nav className="space-x-4 text-gray-700">
          <Link to="/">Home</Link>
          <Link to="/test">Test Form</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/results" className="font-semibold text-orange-500">
            Results
          </Link>
        </nav>
      </header>

      <main className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          🧬 Diagnostic Analysis Results
        </h2>
        <p className="text-gray-700 mb-2">
          Patient: <strong>{patient_name}</strong>
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mt-4 text-left">
          <p>
            <strong>Tumor Detected:</strong> {tumor_detected}
          </p>
          <p>
            <strong>Confidence Score:</strong> {confidence_score}%
          </p>
          <p>
            <strong>Recommendation:</strong> {recommendation}
          </p>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <Link
            to="/upload"
            className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
          >
            🔁 Upload Another Scan
          </Link>
          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            🏠 Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Result;
