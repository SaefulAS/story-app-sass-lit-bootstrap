import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://story-api.dicoding.dev/v1",
  headers: {
    "Content-Type": "application/json",
  }
});

// Tambahkan interceptor untuk Authorization
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
