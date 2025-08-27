import { api } from "../../../shared/api/apiClient";
import  {User}  from "../../../core/entites/Users.kts";

export async function loginApi(email: string, password: string): Promise<User> {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
}

export async function registerApi(
  name: string,
  email: string,
  password: string
): Promise<User> {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
}
