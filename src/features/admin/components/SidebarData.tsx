import type { ReactNode } from 'react';
import { FaUser, FaBox, FaClipboardList } from 'react-icons/fa';

export type LinkItem = { label: string; to: string };
export type Section = {
  key: string;
  icon: ReactNode;
  title: string;
  items: LinkItem[];
};

export const sections: Section[] = [
  {
    key: 'usuario',
    icon: <FaUser />,
    title: 'Usuario',
    items: [
      { label: 'Bitácora', to: '/admin/bitacora' },
      { label: 'Lista de Usuarios', to: '/admin/listausuario' },
      { label: 'Registrar Empleado', to: '/admin/registrar-empleado' },
    ],
  },
  {
    key: 'inventario',
    icon: <FaBox />,
    title: 'Inventario',
    items: [
      { label: 'Registrar Producto', to: '/admin/registrar-producto' },
            { label: 'Listar Producto', to: '/admin/listar-producto' },

      { label: 'Registrar Categoría', to: '/admin/registrar-categoria' },
    ],
  },
  {
    key: 'ventas',
    icon: <FaClipboardList />,
    title: 'Ventas',
    items: [
      { label: 'Ventas Vendidas', to: '/admin/ventas-vendidas' },
      { label: 'Detalle Venta', to: '/admin/detalle-venta' },
    ],
  },
];

export const soporteLink: LinkItem = { label: 'Soporte', to: '/admin/soporte' };
export const BRAND = 'Shoealo.Admin';
