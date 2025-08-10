// src/lib/api.js
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  "https://travel-journal-api-bootcamp.do.dibimbing.id";

const API_KEY =
  import.meta.env.VITE_API_KEY?.trim() ||
  "24405e01-fbc1-45a5-9f5a-be13afcd757c";

const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    apiKey: API_KEY,
  },
});

const isDev = import.meta.env.MODE === "development";

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    if (isDev) {
      console.log("📡 Request:", {
        method: config.method?.toUpperCase(),
        url: config.baseURL + config.url,
        headers: config.headers,
        data: config.data,
      });
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (isDev) {
      console.log("✅ Response:", {
        url: response.config?.url,
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    if (status === 403) console.error("🚫 Forbidden");
    if (status === 404) console.error("🔎 Not Found:", error.config?.url);
    if (status && status >= 500) console.error("💥 Server error:", message);

    if (isDev) {
      console.error("❌ API Error:", {
        url: error.config?.url,
        status,
        message,
        detail: error.response?.data,
      });
    }

    return Promise.reject(error);
  }
);

export default api;
