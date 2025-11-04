// src/types/auth.ts
export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  nombre: string;
  email: string;
  password: string;
  roleId: number; 
  isActive?: boolean;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  email: string;
  password: string;
  code: string;
};

export type UserDTO = {
  id: number;
  email: string;
  nombre: string;
  rolId: number;
  rolNombre: string;
  // agrega aquí otros campos públicos que devuelves (isActive, createdAt, etc.)
};

export type AuthResponse = {
  user: UserDTO;
  token: string;


  permisos?: { nombre: string; status: boolean }[]; // 👈 añade esta línea
};

// src/types/auth.ts
export type EmpleadoRegisterRequest = {
  nombre: string;
  email: string;
  password: string;
  roleId?: number;
  ci?: string;
  telefono?: string;
  direccion?: string;
  imgUrl?: string;
};
