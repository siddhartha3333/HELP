import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import HomePage from "./HomePage";
import HelpListing from "./HelpListing";
import HelpRequest from "./HelpRequest";
import SignIn from "./SignIn";

// Helper function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // Returns true if a token exists
};

// PrivateRoute component: Redirects unauthenticated users to Sign In
function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Validate token with the backend
        const response = await fetch("http://localhost:5000/api/validate-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (data.valid) {
          setAuth(true);
        } else {
          localStorage.clear(); // Clear invalid token
          navigate("/sign-in");
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  if (loading) return <div>Loading...</div>; // Show loading while checking

  return auth ? children : <Navigate to="/sign-in" replace />;
}

// Main App Component
function App() {
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("connect", () => {
      console.log("Connected to the backend socket");
    });
    socket.on("message", (data) => {
      console.log("Message from server:", data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignIn />} />
      {/* Protected Routes */}
      <Route
        path="/help-listing"
        element={
          <PrivateRoute>
            <HelpListing />
          </PrivateRoute>
        }
      />
      <Route
        path="/help-request"
        element={
          <PrivateRoute>
            <HelpRequest />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
