import Nicebg from "../assets/signup.jpg";
import { Link } from "react-router";
import { apiClient } from "../../api/client";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ loading state

  const newUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      username,
      email,
      password,
      confirmPassword
    };

    try {
      setIsLoading(true); // ✅ begin loading
      const response = await apiClient.post("/auth/register", data, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(response);
      toast.success("Sign Up Successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Sign Up Failed");
    } finally {
      setIsLoading(false); // ✅ end loading
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex justify-center items-center px-4 py-10"
      style={{ backgroundImage: `url(${Nicebg})` }}
    >
      <div
        className="bg-cover bg-center w-full max-w-6xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col md:flex-row overflow-hidden rounded-xl"
        style={{ backgroundImage: `url(${Nicebg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
      >
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.5)] px-6 py-12 text-center">
          <p className="text-white font-bold text-4xl md:text-5xl">Let's get started!</p>
          <p className="pt-6 text-lg md:text-2xl text-white italic">
            Already a Member?
            <Link to="/login" className="text-purple-500 font-semibold hover:underline ml-2">
              Log In
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center px-6 py-12 bg-[rgba(255,255,255,0.1)] backdrop-blur-md">
          <form
            onSubmit={newUser}
            className="w-full max-w-md bg-[rgba(255,255,255,0.2)] p-6 md:p-8 rounded-xl text-white backdrop-blur-md"
          >
            <div className="flex flex-col text-center pb-6">
              <p className="font-bold text-3xl">Watch Together</p>
              <p className="text-lg text-gray-300 font-semibold">Movies with friends, anywhere</p>
            </div>

            {/* Inputs */}
            <div className="flex flex-col pb-4">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="border border-[rgba(255,255,255,0.4)] p-2 rounded-md text-black"
                required
              />
            </div>

            <div className="flex flex-col pb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-[rgba(255,255,255,0.4)] p-2 rounded-md text-black"
                required
              />
            </div>

            <div className="flex flex-col pb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-[rgba(255,255,255,0.4)] p-2 rounded-md text-black"
                required
              />
            </div>

            <div className="flex flex-col pb-4">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-[rgba(255,255,255,0.4)] p-2 rounded-md text-black"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading} // ✅ disable during submit
              className={`p-2 w-full mt-2 rounded-md text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ${
                isLoading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
