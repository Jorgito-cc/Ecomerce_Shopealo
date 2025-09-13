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

// -------- ENDPOINTS --------

// Siempre con "/api/v1/..." para evitar problemas de concatenación.

// src/api/auth.ts (rutas SIEMPRE con /api/v1/..)
export const loginRequest = async (payload: LoginRequest): Promise<AuthResponse> => {
  const { data } = await http.post<AuthResponse>("/api/v1/auth/login", {
    email: payload.email.trim(),
    password: payload.password.trim(),
  }, { headers: { "Content-Type": "application/json" } });

  saveSession(data);
  return data;
};


// IMPORTANTE: tu /auth/register NO devuelve { user, token }.
// Solución: tras registrar, hacemos login automático.
// Si falla el login, normalizamos localmente la respuesta para guardar sesión.
export const registerRequest = async (payload: RegisterRequest): Promise<AuthResponse> => {
  // 1) Registro (devuelve algo tipo { id, email, nombre, token, role?... })
  const { data } = await http.post<any>("/api/v1/auth/register", payload, {
    headers: { "Content-Type": "application/json" },
  });

  // 2) Intentar login para obtener { user, token } consistente
  try {
    const normalized = await loginRequest({
      email: payload.email,
      password: payload.password,
    });
    // loginRequest ya hace saveSession(normalized)
    return normalized;
  } catch {
    // 3) Plan B: normalizamos lo que vino del register
    const user: UserDTO = {
      id: data.id ?? 0,
      email: data.email ?? payload.email,
      nombre: data.nombre ?? payload.nombre ?? "",
      rolId: data.rolId ?? data.role?.id ?? payload.roleId ?? 0,
      rolNombre: data.rolNombre ?? data.role?.nombre ?? "USER",
    };
    const normalized: AuthResponse = { user, token: data.token };
    saveSession(normalized);
    return normalized;
  }
};
// FORGOT PASSWORD (envía código al correo)
export const forgotPasswordRequest = async (
  payload: ForgotPasswordRequest
): Promise<{ message: string }> => {
  const body = { email: payload.email.trim().toLowerCase() };
  const { data } = await http.post<{ message: string }>(
    "/api/v1/auth/forgotpassword",
    body,
    { headers: { "Content-Type": "application/json" } }
  );
  return data;
};


// RESET PASSWORD (valida código + nueva pass)
export const resetPasswordRequest = async (
  payload: ResetPasswordRequest
): Promise<{ message?: string }> => {
  const body = {
    email: payload.email.trim().toLowerCase(),
    code: payload.code.trim(),
    password: payload.password.trim(), // min 8
  };
  const { data } = await http.post<{ message?: string }>(
    "/api/v1/auth/resetPassword",
    body,
    { headers: { "Content-Type": "application/json" } }
  );
  return data;
};