import { registerApi } from "../infrastructure/authApi.ts";
import { User } from "../../../core/entites/Users.kts";

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<User> {
  return await registerApi(name, email, password);
}
