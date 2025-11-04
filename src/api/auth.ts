import type {
  AuthResponse,
  EmpleadoRegisterRequest,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UserDTO,
} from "../types/auth";
import { http } from "./http";

// Helpers para la sesión
const saveSession = (data: AuthResponse) => {
  localStorage.setItem("access_token", data.token);
  localStorage.setItem("auth_user", JSON.stringify(data.user));


};

export const getSessionToken = (): string | null => {
  return localStorage.getItem("access_token");
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

export const loginRequest = async (
  payload: LoginRequest
): Promise<AuthResponse> => {
  const { data } = await http.post<AuthResponse>(
    "/api/v1/auth/login",
    {
      email: payload.email.trim(),
      password: payload.password.trim(),
    },
    { headers: { "Content-Type": "application/json" } }
  );

  saveSession(data);
  return data;
};

export const registerRequest = async (
  payload: RegisterRequest
): Promise<AuthResponse> => {
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
    const normalized: AuthResponse = { token: data.token, user };
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
    password: payload.password.trim(),
  };
  const { data } = await http.post<{ message?: string }>(
    "/api/v1/auth/resetPassword",
    body,
    { headers: { "Content-Type": "application/json" } }
  );
  return data;
};

// Crea empleado (no hace login, no guarda token)
export const registerEmpleadoRequest = async (
  payload: EmpleadoRegisterRequest
): Promise<UserDTO> => {
  const body: any = {
    nombre: payload.nombre.trim(),
    email: payload.email.trim().toLowerCase(),
    password: payload.password.trim(),
    roleId: payload.roleId ?? 3, // 👈 CHOFER
    ci: payload.ci?.trim(),
    phone: payload.telefono?.trim(),
    address: payload.direccion?.trim(),
  };

  if (payload.imgUrl) {
    body.imgUrl = payload.imgUrl;
  }

  const { data } = await http.post<UserDTO>("/api/v1/auth/register", body, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

/**
 * Llama a la API para registrar el cierre de sesión en el backend antes de
 * borrar la sesión localmente. Esto asegura que el evento quede en la bitácora.
 */
export const logoutRequest = async (): Promise<void> => {
  const token = getSessionToken();
  if (!token) {
    // Si no hay token, no hay nada que registrar en el backend.
    return;
  }
  
  try {
    // Envía el token en los encabezados para que el backend lo valide.
    await http.post("/api/v1/auth/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error("Error al llamar a la API de logout, la sesión del cliente se cerrará de todos modos.", error);
  }
  // La sesión local se borra en el `AuthContext`
};
