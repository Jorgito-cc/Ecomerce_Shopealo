import type { ProductNewArrival } from "../../../../core/entites/ProductNewArrival";
import promo0 from '../../../../assets/img/imagen16.jpg'; // Usada para la primera cámara
import promo1 from '../../../../assets/img/imagen16.jpg'; // Usada para la segunda cámara
import promo2 from '../../../../assets/img/imagen15.jpg'; // Usada para la primera laptop
import promo3 from '../../../../assets/img/imagen14.jpg'; // Usada para la segunda laptop

export const staticNewArrivals: ProductNewArrival[] = [
  {
    id: 1,
    title: "Cámara Profesional",
    description: "Cámara de alta resolución para fotógrafos exigentes.",
    image: promo0,
    href: "#",
  },
  {
    id: 2,
    title: "Cámara Compacta",
    description: "Cámara compacta ideal para viajes y uso diario.",
    image: promo1,
    href: "#",
  },
  {
    id: 3,
    title: "Laptop Gamer",
    description: "Laptop de alta potencia para una experiencia de juego inmersiva.",
    image: promo2,
    href: "#",
  },
  {
    id: 4,
    title: "Laptop de Oficina",
    description: "Laptop ligera y eficiente para trabajo o estudio.",
    image: promo3,
    href: "#",
  },
];