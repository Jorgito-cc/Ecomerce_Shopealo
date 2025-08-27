import type { User } from "../../../../core/entites/User";


export const staticUsers: User[] = [
  {
    id: 1,
    ci: "12345678",
    username: "jorgecc",
    nombre: "Jorge Choque",
    email: "jorge@example.com",
    password: "********",
    telefono: "75568384",
    direccion: "Calle 1, Zona A",
    img_dir: "/img/jorge.png"
  },
  {
    id: 2,
    ci: "87654321",
    username: "crisg",
    nombre: "Cristian Gedalge",
    email: "cris@example.com",
    password: "********",
    telefono: "77074673",
    direccion: "Av. Siempre Viva 742",
    img_dir: "/img/cris.png"
  },
];
