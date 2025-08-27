import { loginApi } from "../infrastructure/authApi";
import { User } from "../../../core/entites/Users.kts";

export async function loginUser(email: string, password: string): Promise<User> {
  return await loginApi(email, password);
}
