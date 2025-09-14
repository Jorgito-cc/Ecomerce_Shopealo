export type BitacoraLog = {
  id: number;
  ip: string;
  accion: string;
  date: string; // YYYY-MM-DD
  hour: string; // HH:mm:ss
  usuario: {
    id: number;
    nombre: string;
    email: string;
  };
};
