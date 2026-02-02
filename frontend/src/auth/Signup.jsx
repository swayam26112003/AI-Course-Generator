import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { handleError, handleSuccess } from "./Utils";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Name, email and password are required");
    }
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(message || "Signup failed");
      }
      console.log(result);
    } catch (err) {
      handleError(err.message || "Something went wrong");
    }
  };

  console.log("signupInfo -> ", signupInfo);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      {/* Signup Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        {/* Title */}
        <h1 className="text-3xl font-bold text-black text-center">
          Create an Account
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Join{" "}
          <span className="text-blue-600 font-semibold">
            AI Course Generator
          </span>{" "}
          today!
        </p>

        {/* Form */}
        <form onSubmit={handleSignup} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={signupInfo.name}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={signupInfo.email}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={signupInfo.password}
            />
          </div>

          {/* Signup Button */}
          <Button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-lg font-medium hover:bg-gray-800 transition"
          >
            Sign Up
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
