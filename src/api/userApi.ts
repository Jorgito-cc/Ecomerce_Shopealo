import type { User } from "../types/UsersTypes";
import { http } from "./http"; // tu instancia de axios

// GET todos los usuarios
export const getUsers = async (): Promise<User[]> => {
  const { data } = await http.get<User[]>("/api/v1/usuario");
  return data;
};

// PATCH update
export const updateUser = async (id: number, payload: Partial<User>): Promise<User> => {
  const { data } = await http.patch<User>(`/api/v1/usuario/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

// DELETE → baja lógica
export const deleteUser = async (id: number): Promise<void> => {
  await http.delete(`/api/v1/usuario/${id}`);
};

// PATCH → restaurar (isActive = true)
export const restoreUser = async (id: number): Promise<User> => {
  const { data } = await http.patch<User>(
    `/api/v1/usuario/${id}`,
    { isActive: true },
    { headers: { "Content-Type": "application/json" } }
  );
  return data;
};
