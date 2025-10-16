import type { ReactNode } from "react";
import { FaUser, FaBox, FaCloudUploadAlt } from "react-icons/fa";
/* despues para el sp2 hay que añadir FaClipboardList */
export type LinkItem = { label: string; to: string };
export type Section = {
  key: string;
  icon: ReactNode;
  title: string;
  items: LinkItem[];
};

export const sections: Section[] = [
  {
    key: "usuario",
    icon: <FaUser />,
    title: "Usuario",
    items: [
      { label: "Bitácora", to: "/admin/bitacora" },
      { label: "Lista de Usuarios", to: "/admin/listausuario" },
      { label: "Registrar Empleado", to: "/admin/registrar-empleado" },
    ],
  },
  {
    key: "inventario",
    icon: <FaBox />,
    title: "Inventario",
    items: [
      { label: "Registrar Producto", to: "/admin/registrar-producto" },
      { label: "Listar Producto", to: "/admin/listar-producto" },

      { label: "Registrar Categoría", to: "/admin/registrar-categoria" },
      { label: "Registrar Proveedores", to: "/admin/registrar-proveedores" },

      { label: "Listar Proveedores", to: "/admin/listarproveedores" },
      { label: "Listar Ordenes", to: "/admin/ordenesAdmin" },

    ],
  },
  {
    key: "Caracteristicas",
    icon: < FaCloudUploadAlt />,
    title: "Caracteristicas",
    items: [
      { label: "Backup", to: "/admin/backup" },
     { label: "Reportes", to: "/admin/reportes" },

    ],
  }, 
  /*   {
    key: "ventas",
    icon: <FaClipboardList />,
    title: "Ventas",
    items: [
      { label: "Ventas Vendidas", to: "/admin/ventas-vendidas" },
      { label: "Detalle Venta", to: "/admin/detalle-venta" },
    ],
  }, */
];

export const soporteLink: LinkItem = { label: "Soporte Tecnico", to: "/admin/soporte" };

export const ManualLink: LinkItem = { label: "Manual Tecnico", to: "/admin/manual" };
export const ManualteoricoLink: LinkItem = { label: "Manual", to: "/admin/manualteorico" };

export const BRAND = "Shoealo.Admin";
