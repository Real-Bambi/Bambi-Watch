import { apiClient } from "../../api/client";
import Goodbg from "../assets/loginin.jpg";
import { Link, useNavigate } from "react-router";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Login successful:", response);

      const { token, id, username, email } = response.data;

      if (token) {
        // ✅ Save token for API authentication
        localStorage.setItem("token", token);

        // ✅ Save basic user data
        localStorage.setItem("user", JSON.stringify({ id, username, email }));

        // ✅ Update global auth context
        login(response.data);

        // ✅ Navigate to dashboard
        navigate("/dashboard");
      } else {
        console.error("No token received");
        toast.success("Login Up Successful");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Sign Up Failed");
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex justify-center items-center px-4 py-10"
      style={{ backgroundImage: `url(${Goodbg})` }}
    >
      <div className="bg-[rgba(255,255,255,0.2)] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col md:flex-row w-[90%] max-w-6xl h-auto md:h-[80vh] overflow-hidden rounded-lg">

        {/* Login Form */}
        <div className="w-full md:w-[50%] flex justify-center items-center p-6 md:p-10">
          <form onSubmit={loginUser} className="w-full max-w-md text-white">
            <div className="text-center pb-6">
              <p className="font-bold text-3xl">Watch Together</p>
              <p className="text-lg text-gray-300">
                Watch movies with friends, anywhere
              </p>
            </div>

            <div className="pb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-2 rounded-md border border-white/40 bg-transparent text-white placeholder-gray-300"
                required
              />
            </div>

            <div className="pb-6">
              <label htmlFor="password" className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-2 rounded-md border border-white/40 bg-transparent text-white placeholder-gray-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Side Welcome Text */}
        <div className="w-full md:w-[50%] flex flex-col justify-center items-center bg-[rgba(0,0,0,0.5)] p-6 md:p-10 text-center">
          <p className="text-white font-bold text-4xl md:text-5xl">Welcome back!</p>
          <p className="text-white text-lg md:text-2xl italic pt-4">
            Don't have an account?
            <Link to="/sign-up" className="text-purple-400 font-semibold hover:underline ml-2">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>

  );
}
