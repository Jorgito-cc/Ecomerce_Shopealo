export interface User {
  id: number;
  ci: string;
  username: string;
  nombre: string;
  email: string;
  password: string;
  telefono: string;
  direccion: string;
  img_dir?: string; // opcional
}
