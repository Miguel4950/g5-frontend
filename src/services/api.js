import axios from "axios";

const baseApiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const attachToken = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return instance;
};

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL || `${baseApiUrl}/auth`,
});

export const catalogApi = attachToken(
  axios.create({
    baseURL: import.meta.env.VITE_CATALOG_URL || `${baseApiUrl}/books`,
  })
);

export const loansApi = attachToken(
  axios.create({
    baseURL: import.meta.env.VITE_LOANS_URL || `${baseApiUrl}/loans`,
  })
);

export const api = attachToken(
  axios.create({
    baseURL: baseApiUrl,
  })
);
