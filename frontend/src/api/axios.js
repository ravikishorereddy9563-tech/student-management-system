import axios from "axios";

const configuredApiUrl =
  import.meta.env.VITE_API_URL?.trim() ||
  (window.location.hostname.endsWith("vercel.app")
    ? "https://student-management-system-ztsv-gules.vercel.app/api"
    : "http://127.0.0.1:8000/api");

const api = axios.create({
  baseURL: configuredApiUrl.replace(/\/+$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
});


// ============================================================
// ADD JWT ACCESS TOKEN TO EVERY REQUEST
// ============================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// ============================================================
// REFRESH ACCESS TOKEN WHEN IT EXPIRES
// ============================================================

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refresh_token");

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      !refreshToken ||
      originalRequest?.url?.includes("/auth/token/refresh/")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await axios.post(
        `${api.defaults.baseURL}/auth/token/refresh/`,
        {
          refresh: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const accessToken = response.data.access;

      localStorage.setItem(
        "access_token",
        accessToken
      );

      originalRequest.headers.Authorization =
        `Bearer ${accessToken}`;

      return api(originalRequest);

    } catch (refreshError) {

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      window.location.href = "/login";

      return Promise.reject(refreshError);
    }
  }
);

export default api;