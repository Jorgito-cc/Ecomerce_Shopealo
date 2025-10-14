
import { http } from "./http";
import type { BackupDTO } from "../types/backupTypes";

const BASE = "/api/v1/backup";

// Obtener todos los backups
export const getBackups = async (): Promise<BackupDTO[]> => {
  const { data } = await http.get<BackupDTO[]>(BASE);
  return data;
};

// Generar un nuevo backup manualmente
export const createBackup = async (): Promise<BackupDTO> => {
  const { data } = await http.post<BackupDTO>(BASE);
  return data;
};

// Descargar un backup por id
export const downloadBackup = async (id: number): Promise<void> => {
  const response = await http.get(`${BASE}/${id}`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;

  // extraer nombre del header Content-Disposition
  const disposition = response.headers["content-disposition"];
  const match = disposition && disposition.match(/filename="(.+)"/);
  link.setAttribute("download", match ? match[1] : `backup-${id}.sql`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

// Eliminar un backup
export const deleteBackup = async (id: number): Promise<void> => {
  await http.delete(`${BASE}/${id}`);
};
