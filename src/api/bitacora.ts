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
import { http } from "./http";
import type { BitacoraLog } from "../types/bitacora";


// getbitacora
/* export const getBitacoraLogs = async (password: string): Promise<BitacoraLog[]> => {
  const { data } = await http.post<BitacoraLog[]>("/api/v1/bitacora", { password });
  return data;
};
 */
export const getBitacoraLogs = async (password: string): Promise<BitacoraLog[]> => {
  const { data } = await http.get<BitacoraLog[]>(`/api/v1/bitacora?password=${password}`);
  return data;
};
