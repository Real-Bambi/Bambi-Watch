import {
  UsersIcon,
  FilmIcon,
  Clock,
  Camera,
  History,
  Play,
  Star,
  Clapperboard,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Movie1Image from "../assets/movie1.jpg";
import Movie2Image from "../assets/movie2.jpg";
import Movie3Image from "../assets/movie3.jpg";
import Footer from "../components/Footer";
import { useState } from "react";
import { apiClient, apiFetcher } from "../../api/client";
import useSWR from "swr";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ bio: "" });
  const [avatarFile, setAvatarFile] = useState(null);

  const OpenModal = () => setIsModalOpen(true);
  const CloseModal = () => setIsModalOpen(false);

  const { data, isLoading, error, mutate } = useSWR("users/me", apiFetcher);

  const UpdateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }

      const form = new FormData();
      if (avatarFile) {
        form.append("avatar", avatarFile);
      }
      if (formData.bio) {
        form.append("bio", formData.bio);
      }

      await apiClient.patch("users/me", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      await mutate(); // Re-fetch updated user data
      CloseModal();
      toast.success("Profile updated!");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      const errorMsg =
        err?.response?.data?.message || "Failed to update profile.";
      toast.error(errorMsg);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <BeatLoader size={30} color="#9333EA" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white text-center mt-10">
        Failed to load user info.
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] min-h-screen">
      <ToastContainer />
      <Navbar />

      <div className="flex flex-col md:flex-row bg-gradient-to-r from-purple-600 to-cyan-500 justify-between items-center mt-10 rounded-xl p-6 w-[90%] mx-auto shadow-md">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={data.avatarUrl}
              alt="User Avatar"
              className="w-20 h-20 rounded-full object-cover border border-white shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <label className="w-full h-full opacity-0 absolute cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files[0])}
                />
              </label>
              <span className="text-xs text-black">
                <Camera size={14} />
              </span>
            </div>
          </div>
          <div className="text-white">
            <h2 className="font-bold text-lg">{data.username}</h2>
            <p>{data.bio || "Movie enthusiast & binge watcher extraordinaire"}</p>
            <div className="flex flex-col md:flex-row gap-4 mt-2">
              <span className="flex gap-1 items-center">
                <FilmIcon size={18} /> <p>89 Movies watched</p>
              </span>
              <span className="flex gap-1 items-center">
                <Clock size={18} /> <p>342 Hours</p>
              </span>
            </div>
          </div>
        </div>
        <button
          className="bg-white px-6 py-2 m-4 rounded text-[#4F84E7] hover:text-blue-950"
          onClick={OpenModal}
        >
          Edit Profile
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-purple-400 to-white bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={CloseModal}
        >
          <div
            className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={UpdateUser} className="flex flex-col gap-5">
              <h2 className="text-xl font-semibold text-purple-700">
                Update Profile
              </h2>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files[0])}
              />
              <textarea
                name="bio"
                placeholder="Update your bio..."
                // defaultValue={data.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full h-32 px-4 py-2 border border-[#9333EA] resize-none"
              />
              <button
                type="submit"
                className="px-6 py-2 text-white bg-[#9333EA] font-medium rounded"
              >
                Done
              </button>
            </form>
          </div>
        </div>
      )}

      {/* History Section */}
      <section className="bg-[#1E293B] flex flex-col justify-between gap-5 w-[90%] mx-auto mt-10 rounded p-4">
        <div className="flex items-center gap-2 p-2">
          <History className="text-[#9333EA]" />
          <h1 className="text-white text-2xl">
            Create a Virtual Room on the Dashboard
          </h1>
        </div>
        <div className="bg-[#0F172A] w-[90%] mx-auto flex items-center gap-2 p-2 rounded">
          <div className="bg-[#9333EA] p-1.5 rounded">
            <Play className="w-5 h-5" />
          </div>
          <div className="text-white">
            <h2>Watched "Faults in Our Stars" with Friends in real time</h2>
          </div>
        </div>
        <div className="bg-[#0F172A] w-[90%] mx-auto flex items-center gap-2 p-2 rounded">
          <div className="bg-[#9333EA] p-1.5 rounded">
            <Star className="w-5 h-5" />
          </div>
          <div className="text-white">
            <h2>Share Your Opinions about the movie in our group chat</h2>
          </div>
        </div>
      </section>

      {/* Recommended Movies Section */}
      <section className="bg-[#1E293B] p-4 w-[90%] mx-auto mt-8">
        <div className="flex items-center gap-2 text-white p-2">
          <Clapperboard className="text-[#9333EA]" />
          <h2 className="font-bold text-xl">Recommended Movies</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center pt-6 gap-10 w-[90%] mx-auto text-white">
          {[Movie1Image, Movie2Image, Movie3Image].map((movie, index) => (
            <div
              key={index}
              className="w-64 rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={movie}
                alt="Movie"
                className="w-full h-96 object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg">
                  {index === 0
                    ? "Faults in Our Stars"
                    : index === 1
                    ? "Kpop Demon Hunter"
                    : "Now You See Me"}
                </h2>
                <p className="text-sm text-gray-400">
                  {index === 0
                    ? "Romance . 2014"
                    : index === 1
                    ? "Animation . 2025"
                    : "Thriller . 2013"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
