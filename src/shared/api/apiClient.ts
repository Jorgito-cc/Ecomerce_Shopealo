import axios from "axios";

// instancia de axios
export const api = axios.create({
  baseURL: "https://fakestoreapi.com", // URL base de tu API
  headers: {
    "Content-Type": "application/json",
  },
});

// Opcional: interceptores para agregar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // si guardas JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Opcional: interceptores de respuesta para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
