// src/api/bitacora.ts
//import {http} from "./http"; // 👈 tu instancia axios// configurada
//import type { BitacoraLog } from "../types/bitacora";

// GET BITACORA (no requiere token según tu backend)
/* export const getBitacoraLogs = async (): Promise<BitacoraLog[]> => {
  const { data } = await http.get<BitacoraLog[]>("/api/v1/bitacora");
  return data;
};
 */

// src/api/bitacora.ts



export const getBitacoraLogs = async (password: string) => {
  const response = await fetch("https://backend-ecommerce-production-0ef1.up.railway.app/api/v1/bitacora", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // ⚠️ algunos navegadores ignoran body en GET, pero si tu backend lo acepta, funcionará
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
  }

  return response.json();
};
