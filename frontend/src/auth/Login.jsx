import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { handleError, handleSuccess } from "./Utils";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handeleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message } = result;

      if (success) {
        handleSuccess(message);
        if (result.jwtToken) localStorage.setItem("token", result.jwtToken);
        if (result.name) localStorage.setItem("userName", result.name);
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        handleError(message || "Signup failed");
      }
      console.log(result);
    } catch (err) {
      handleError(err.message || "Something went wrong");
    }
  };

  console.log("loginInfo -> ", loginInfo);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        {/* Title */}
        <h1 className="text-3xl font-bold text-black text-center">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Log in to{" "}
          <span className="text-blue-600 font-semibold">
            AI Course Generator
          </span>
        </p>

        {/* Form */}
        <form className="mt-6 flex flex-col gap-4" onSubmit={handeleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={loginInfo.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-lg font-medium hover:bg-gray-800 transition"
          >
            Log In
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
