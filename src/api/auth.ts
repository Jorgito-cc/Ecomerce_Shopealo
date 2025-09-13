// src/api/auth.ts


import type {
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UserDTO,
} from "../types/auth";
import { http } from "./http";

// Helpers para almacenar sesión
const saveSession = (data: AuthResponse) => {
  localStorage.setItem("access_token", data.token);
  localStorage.setItem("auth_user", JSON.stringify(data.user));
};

export const getSessionUser = (): UserDTO | null => {
  const raw = localStorage.getItem("auth_user");
  return raw ? (JSON.parse(raw) as UserDTO) : null;
};

export const clearSession = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("auth_user");
};

// === Endpoints ===

// POST /auth/login
export const loginRequest = async (payload: LoginRequest): Promise<AuthResponse> => {
  const { data } = await http.post<AuthResponse>("/auth/login", payload, {
    headers: { "Content-Type": "application/json" },
  });
  saveSession(data);
  return data;
};

// POST /auth/register
export const registerRequest = async (
  payload: RegisterRequest
): Promise<AuthResponse> => {
  const { data } = await http.post<AuthResponse>("/auth/register", payload, {
    headers: { "Content-Type": "application/json" },
  });
  // si quieres auto-login tras registro:
  saveSession(data);
  return data;
};

// POST /auth/forgotpassword
export const forgotPasswordRequest = async (
  payload: ForgotPasswordRequest
): Promise<{ message: string }> => {
  const { data } = await http.post<{ message: string }>(
    "/auth/forgotpassword",
    payload
  );
  return data;
};

// POST /auth/resetPassword
export const resetPasswordRequest = async (
  payload: ResetPasswordRequest
): Promise<{ message?: string }> => {
  const { data } = await http.post<{ message?: string }>(
    "/auth/resetPassword",
    payload
  );
  return data;
};
