import axios from "axios";

// Fallback to a default if environment variable is missing
const BASE_URL = import.meta.env.VITE_API_BASE_URL 

export const apiClient = axios.create({
  baseURL: BASE_URL
});

// Automatically attach token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log("Token attached to request"); // Optional for debugging
    } else {
      // console.warn("No token found in localStorage"); // Optional for debugging
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
