import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://api.melwirt.com/");

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Attach access token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // 🔥 same as loginUser.js
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 + refresh
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh"); // 🔥 correct key

        if (!refresh) {
          throw new Error("Refresh token missing");
        }

        // Django simplejwt refresh endpoint
        const response = await axios.post(`${BASE_URL}/api/accounts/refresh/`, {
          refresh: refresh,
        });

        const newAccess = response.data.access;

        // Save corrected token
        localStorage.setItem("token", newAccess);

        // Update headers
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccess}`;

        return axiosInstance(originalRequest);
      } catch (e) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
