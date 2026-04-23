import axios from "axios";

let inMemoryToken = null;

const readStoredToken = () => {
  try {
    return localStorage.getItem("eventsphere_token");
  } catch {
    return null;
  }
};

export const setAuthToken = (token) => {
  inMemoryToken = token || null;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

api.interceptors.request.use((config) => {
  const token = inMemoryToken || readStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong";

export default api;
