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

  // opcionales
  username?: string;
  ci?: string;
  telefono?: string;
  direccion?: string;
  img_dir?: string;
  password?: string;   // 👈 añadirlo como opcional
};
