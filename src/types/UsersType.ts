// src/types/User.ts
export type RoleDTO = {
  id: number;
  nombre: string;
};

export type User = {
  id: number;
  nombre: string;
  email: string;
  isActive: boolean;
  role: RoleDTO;

  username?: string;
  ci?: string;
  telefono?: string;
  direccion?: string;
  img_dir?: string;
  password?: string; // opcional, para que no dé error
};

