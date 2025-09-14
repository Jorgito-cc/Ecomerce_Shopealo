// src/api/bitacora.ts
import {http} from "./http"; // 👈 tu instancia axios configurada
import type { BitacoraLog } from "../types/bitacora";

// GET BITACORA (no requiere token según tu backend)
export const getBitacoraLogs = async (): Promise<BitacoraLog[]> => {
  const { data } = await http.get<BitacoraLog[]>("/api/v1/bitacora");
  return data;
};
