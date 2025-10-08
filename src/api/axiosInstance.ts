import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_HOSTNAME;
const API_PORT = import.meta.env.VITE_API_PORT;
const API_SSL = import.meta.env.VITE_API_SSL;

const fullApiBaseUrl = `${API_SSL === 'true' ? 'https' : 'http'}://${API_BASE_URL}:${API_PORT}`;
console.log("API Base URL:", fullApiBaseUrl);
const axiosInstance = axios.create({
  baseURL: fullApiBaseUrl,
  withCredentials: true, // This sends cookies and credentials with requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
