import type { Banner } from "../../../../core/entites/Banner";
import promo0 from '../../../../assets/img/imagen16.jpg';
import promo1 from '../../../../assets/img/imagen16.jpg';
import promo2 from '../../../../assets/img/imagen15.jpg';
import promo3 from '../../../../assets/img/imagen14.jpg';
import promo4 from '../../../../assets/img/imagen13.jpg';
import promo5 from '../../../../assets/img/imagen12.jpg';
import promo6 from '../../../../assets/img/imagen12.jpg';
import promo7 from '../../../../assets/img/imagen11.jpg';
import promo8 from '../../../../assets/img/imagen10.jpg';
import promo9 from '../../../../assets/img/imagen9.jpg';

export const staticBanners: Banner[] = [
  {
    id: 1,
    brand: "Apple",
    series: "MacBook Air M2",
    headline: "Ahorra hasta 15% en Back to School",
    cta: { label: "Compra ahora", href: "#" },
    image: promo0,
  },
  {
    id: 2,
    brand: "HP",
    series: "Pavilion x360",
    headline: "Pantalla touch + Stylus gratis",
    cta: { label: "Ver oferta", href: "#" },
    image: promo1,
  },
  {
    id: 3,
    brand: "Dell",
    series: "XPS 13 Plus",
    headline: "Descuento exclusivo del 10%",
    cta: { label: "Aprovechar", href: "#" },
    image: promo2,
  },
  {
    id: 4,
    brand: "Lenovo",
    series: "Yoga Slim 7i",
    headline: "Incluye Office 365 por 1 año",
    cta: { label: "Descúbrelo", href: "#" },
    image: promo3,
  },
  {
    id: 5,
    brand: "ASUS",
    series: "ZenBook OLED",
    headline: "Colores vivos, precio rebajado",
    cta: { label: "Comprar", href: "#" },
    image: promo4,
  },
  {
    id: 6,
    brand: "Acer",
    series: "Swift 3",
    headline: "Liviana y potente, ideal para estudio",
    cta: { label: "Ver más", href: "#" },
    image: promo5,
  },
  {
    id: 7,
    brand: "MSI",
    series: "Modern 14",
    headline: "Ideal para creativos y estudiantes",
    cta: { label: "Descubre ahora", href: "#" },
    image: promo6,
  },
  {
    id: 8,
    brand: "Razer",
    series: "Blade 15",
    headline: "Potencia gamer + diseño profesional",
    cta: { label: "Ver laptop", href: "#" },
    image: promo7,
  },
  {
    id: 9,
    brand: "Samsung",
    series: "Galaxy Book3",
    headline: "Conectividad total con tu ecosistema Galaxy",
    cta: { label: "Explorar", href: "#" },
    image: promo8,
  },
  {
    id: 10,
    brand: "Microsoft",
    series: "Surface Laptop 5",
    headline: "Rendimiento premium + diseño delgado",
    cta: { label: "Compra ya", href: "#" },
    image: promo9,
  },
];
