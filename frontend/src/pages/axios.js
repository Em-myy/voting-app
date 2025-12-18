import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
});

let requestInterceptorId = null;

export const setupAxiosInterceptors = (token) => {
  if (requestInterceptorId !== null) {
    axiosInstance.interceptors.request.eject(requestInterceptorId);
  }
  requestInterceptorId = axiosInstance.interceptors.request.use(
    (config) => {
      if (token && token !== "null" && token !== "undefined") {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export const adminSetupAxiosInterceptors = (adminToken) => {
  if (requestInterceptorId !== null) {
    axiosInstance.interceptors.request.eject(requestInterceptorId);
  }
  requestInterceptorId = axiosInstance.interceptors.request.use(
    (config) => {
      if (adminToken && adminToken !== "null" && adminToken !== "undefined") {
        config.headers["Authorization"] = `Bearer ${adminToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default axiosInstance;
