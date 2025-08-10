import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://travel-journal-api-bootcamp.do.dibimbing.id";

const API_KEY = import.meta.env.VITE_API_KEY; // 🚨 isi di .env

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    apiKey: API_KEY, // wajib untuk semua request
  },
});

// Interceptor untuk menambahkan token kalau ada
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk error response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `[API ERROR] ${error.response.status} - ${error.response.config?.url}`,
        error.response.data
      );

      if (error.response.status === 401) {
        localStorage.removeItem("token");
      }
    } else {
      console.error("[API ERROR] No response from server", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
