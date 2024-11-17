import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  // Help Button Click Logic
  const handleHelpClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/help-request"); // Redirect if authenticated
    } else {
      navigate("/sign-in"); // Redirect to sign-in page if unauthenticated
    }
  };

  // Emergency Link Click Logic
  const handleEmergencyClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/help-listing"); // Redirect if authenticated
    } else {
      navigate("/sign-in"); // Redirect to sign-in page if unauthenticated
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6">
      {/* Big HELP Button */}
      <div className="flex-grow flex items-center justify-center">
        <button
          onClick={handleHelpClick}
          className="w-64 h-64 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg text-white text-5xl font-bold tracking-wide transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 active:scale-95"
          style={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          HELP
        </button>
      </div>

      {/* Emergency Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-lg font-medium">
          I am here to help
        </p>
        <button
          onClick={handleEmergencyClick}
          className="text-red-500 text-lg font-semibold hover:text-red-600 underline focus:outline-none"
        >
          Take me to the emergency room!
        </button>
      </div>
    </div>
  );
}
