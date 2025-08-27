import { FaTruck, FaHeadphonesAlt, FaUndoAlt } from "react-icons/fa";
import type { FullServices } from "../../../../core/entites/FullServices";

export const staticFullService: FullServices[] = [
  {
    id: 1,
    title: "ENVÍO GRATIS Y RÁPIDO",
    subtitle: "Envío gratuito para todos los pedidos mayores a $140",
    icon: <FaTruck className="text-white text-xl" />,
  },
  {
    id: 2,
    title: "ATENCIÓN AL CLIENTE 24/7",
    subtitle: "Soporte al cliente disponible las 24 horas, todos los días",
    icon: <FaHeadphonesAlt className="text-white text-xl" />
  },
  {
    id: 3,
    title: "GARANTÍA DE DEVOLUCIÓN",
    subtitle: "Devolvemos tu dinero dentro de los 30 días",
    icon: <FaUndoAlt className="text-white text-xl"/>
  },
];
