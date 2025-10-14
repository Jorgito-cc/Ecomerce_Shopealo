// src/types/backupTypes.ts
export interface BackupDTO {
  id: number;
  name: string;
  filePath: string;
  size: string;
  backupType: "MANUAL" | "AUTOMATICO";
  date: string;
  hour: string;
}
