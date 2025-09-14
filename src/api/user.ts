import type { User } from "../types/user";
import { http } from "./http"; // tu cliente axios preconfigurado

// GET todos los usuarios
export const getUsers = async (): Promise<User[]> => {
  const { data } = await http.get<User[]>("/api/v1/usuario");
  return data;
};

// GET usuario por id
export const getUserById = async (id: number): Promise<User> => {
  const { data } = await http.get<User>(`/api/v1/usuario/${id}`);
  return data;
};

// PATCH usuario
export const updateUser = async (
  id: number,
  payload: Partial<User>
): Promise<User> => {
  const { data } = await http.patch<User>(`/api/v1/usuario/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

// DELETE usuario
export const deleteUser = async (id: number): Promise<void> => {
  await http.delete(`/api/v1/usuario/${id}`);
};
