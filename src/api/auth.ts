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

// Helpers sesión
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

// ============ ENDPOINTS ============

// POST /auth/login  -> ya devuelve { user, token }
export const loginRequest = async (payload: LoginRequest): Promise<AuthResponse> => {
  const { data } = await http.post<AuthResponse>("api/v1/auth/login", payload, {
    headers: { "Content-Type": "application/json" },
  });
  saveSession(data);
  return data;
};

// POST /auth/register  -> hoy NO devuelve { user, token }.
// Solución: tras registrar, hacemos login para normalizar; si falla, normalizamos localmente.
export const registerRequest = async (payload: RegisterRequest): Promise<AuthResponse> => {
  // 1) Registrar (devuelve algo como { id, email, nombre, token, ... })
  const { data } = await http.post<any>("api/v1/auth/register", payload, {
    headers: { "Content-Type": "application/json" },
  });

  // 2) Intentar login para obtener AuthResponse consistente
  try {
    const normalized = await loginRequest({ email: payload.email, password: payload.password });
    // loginRequest ya hace saveSession(normalized)
    return normalized;
  } catch {
    // 3) Plan B: normalizar localmente la respuesta del register
    const user: UserDTO = {
      id: data.id ?? 0,
      email: data.email ?? payload.email,
      nombre: data.nombre ?? "",
      rolId: data.rolId ?? data.role?.id ?? payload.roleId ?? 0,
      rolNombre: data.rolNombre ?? data.role?.nombre ?? "USER",
    };
    const normalized: AuthResponse = { user, token: data.token };
    saveSession(normalized);
    return normalized;
  }
};

export const forgotPasswordRequest = async (
  payload: ForgotPasswordRequest
): Promise<{ message: string }> => {
  const { data } = await http.post<{ message: string }>("api/v1/auth/forgotpassword", payload);
  return data;
};

export const resetPasswordRequest = async (
  payload: ResetPasswordRequest
): Promise<{ message?: string }> => {
  const { data } = await http.post<{ message?: string }>("api/v1/auth/resetPassword", payload);
  return data;
};
