import type { RoleDTO } from "../types/UsersTypes";
import { http } from "./http";

export const getRoles = async (): Promise<RoleDTO[]> => {
  const { data } = await http.get<RoleDTO[]>("/api/v1/role");
  return data;
};
