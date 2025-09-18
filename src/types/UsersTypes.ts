/* export type RoleDTO = {
  id: number;
  nombre: string;
};



export type User = {
  id: number;
  nombre: string;
  email: string;
  isActive: boolean;
  address?: string; // Campo agregado
  ci?: string;     // Campo agregado
  phone?: string;  // Campo agregado
  imgUrl?: string; // Campo agregado
  role: RoleDTO;

  username?: string;
  img_dir?: string;
  password?: string;
}; */
export type RoleDTO = {
  id: number;
  nombre: string;
};

export type User = {
  id: number;
  nombre: string;
  email: string;
  isActive: boolean;
  address?: string;
  ci?: string;
  phone?: string;
  imgUrl?: string;
  role: RoleDTO; // Make sure this is present

  username?: string;
  img_dir?: string;
  password?: string;
};
