// src/components/Signup.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // A popular icon library, `npm install lucide-react`

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // State for showing/hiding the password
  const [showPassword, setShowPassword] = useState(false);
  // State to handle loading during form submission
  const [loading, setLoading] = useState(false);
  // State to display any errors from the backend
  const [error, setError] = useState(null);

  // Hook for programmatic navigation after successful signup
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Clear previous error when user starts typing again
    if (error) setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions

    setLoading(true);
    setError(null);

    try {
      // **THIS IS WHERE YOU'LL MAKE THE API CALL**
      // Example using fetch:
      const response = await fetch("https://your-backend-api.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the server returns an error (e.g., email already exists)
        throw new Error(data.message || "Something went wrong during signup.");
      }

      console.log("Signup successful:", data);
      
      // On success, you might get a token or user data back.
      // Now, redirect the user to the login page or directly to the app dashboard.
      navigate("/login");

    } catch (err) {
      // Catch errors from the fetch call or the thrown error
      setError(err.message);
      console.error("Signup failed:", err);
    } finally {
      // This will run whether the request succeeded or failed
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#111B21] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#202C33] p-8 rounded-xl shadow-lg w-full max-w-sm space-y-6"
        noValidate // Prevents default browser validation, so we can handle it ourselves
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-[#8696A0] mt-2">Join the conversation</p>
        </div>

        {/* --- Name Input --- */}
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-[#2A3942] rounded-lg outline-none text-sm focus:ring-2 focus:ring-emerald-500 transition-shadow"
            required
            autoComplete="name"
          />
        </div>

        {/* --- Email Input --- */}
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-[#2A3942] rounded-lg outline-none text-sm focus:ring-2 focus:ring-emerald-500 transition-shadow"
            required
            autoComplete="email"
          />
        </div>

        {/* --- Password Input with Show/Hide Toggle --- */}
        <div className="relative">
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-[#2A3942] rounded-lg outline-none text-sm focus:ring-2 focus:ring-emerald-500 transition-shadow"
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#8696A0] hover:text-white"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* --- Error Display --- */}
        {error && (
            <div className="bg-red-900/50 text-red-300 p-3 rounded-lg text-center text-sm">
                {error}
            </div>
        )}

        {/* --- Submit Button with Loading State --- */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:bg-emerald-800 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center text-[#8696A0]">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-emerald-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;