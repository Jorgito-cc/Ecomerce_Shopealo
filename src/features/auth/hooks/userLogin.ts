
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../aplication/loginUser";

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (user) => {
      localStorage.setItem("token", user.token!); // Guardamos el token
    },
  });
}
