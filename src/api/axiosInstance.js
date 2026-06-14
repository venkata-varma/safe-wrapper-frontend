import axios from "axios";
// let renderLocalHostUrl="http://localhost:8201/api" || "https://safe-wrapper-backend.onrender.com"

let renderLocalHostUrl="https://safe-wrapper-backend.onrender.com/api"
const axiosInstance = axios.create({
  baseURL: renderLocalHostUrl
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/"
    ) {
      localStorage.clear();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance; 