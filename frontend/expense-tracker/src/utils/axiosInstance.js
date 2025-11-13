import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const reqUrl = error.config?.url || "";

      if (status === 401) {
        // Do not redirect on failed login/register attempts; let UI show error
        const isAuthAttempt = reqUrl.includes("/auth/login") || reqUrl.includes("/auth/register");
        if (!isAuthAttempt) {
          // For other 401s, clear storage and notify app; routing can handle navigation
          try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.dispatchEvent(new Event("auth:unauthorized"));
          } catch (_) {}
        }
      } else if (status === 500) {
        console.error("Server error:", error.response.data);
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error); 
  }
);

export default axiosInstance;
