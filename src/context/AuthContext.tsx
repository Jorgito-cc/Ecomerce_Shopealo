import { createContext, useContext, useMemo, useState } from "react";
import type { AuthResponse, UserDTO } from "../types/auth";
import {
  clearSession,
  getSessionUser,
  loginRequest,
  logoutRequest, // <-- ¡Importado!
  registerRequest,
} from "../api/auth";
import type { LoginRequest, RegisterRequest } from "../types/auth";

function normalizeUser(raw: any): UserDTO {
  return {
    id: raw.id,
    email: raw.email,
    nombre: raw.nombre,
    rolId: raw.rolId ?? raw.role?.id ?? 0,
    rolNombre: raw.rolNombre ?? raw.role?.nombre ?? "",
  };
}

type AuthContextType = {
  user: UserDTO | null;
  isAuthenticated: boolean;
  login: (payload: LoginRequest) => Promise<AuthResponse>;
  register: (payload: RegisterRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>; // <-- ¡Cambiado a una Promesa!
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDTO | null>(
    (() => {
      const u = getSessionUser();
      return u ? normalizeUser(u) : null;
    })()
  );

  const login = async (payload: LoginRequest) => {
    const res = await loginRequest(payload);
    const u = normalizeUser(res.user);
    setUser(u);
    return { ...res, user: u };
  };

  const register = async (payload: RegisterRequest) => {
    const res = await registerRequest(payload);
    const u = normalizeUser(res.user);
    setUser(u);
    return { ...res, user: u };
  };

  const logout = async () => { // <-- ¡Ahora es asíncrona!
    await logoutRequest(); // Llama a la API para registrar el evento
    clearSession(); // Limpia la sesión local
    setUser(null); // Borra el estado del usuario
    window.location.reload(); // <-- ¡Añadido!
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, register, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
