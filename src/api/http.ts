// src/api/http.ts
import axios from "axios";

export const BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export const http = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, // solo si usas cookies
});

// Adjunta el token a cada request si existe
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Manejo simple de 401: limpiar sesión
http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("auth_user");
      // opcional: redirigir a /login
      // window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
