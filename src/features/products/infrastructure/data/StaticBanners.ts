import type { Banner } from "../../../../core/entites/Banner";

// una lista de objetosss
export const staticBanners: Banner[] = [
  {
    id: 1,
    brand: "Apple",
    series: "iPhone 14 Series",
    headline: "Up to 10% off Voucher",
    cta: { label: "Shop Now", href: "#" },
    image: '../../../../assets/img/imagen1.png'
    
  },
  {
    id: 2,
    brand: "Samsung",
    series: "Galaxy Z Flip",
    headline: "Free Smartwatch with purchase",
    cta: { label: "View Offer", href: "#" },
    image: "../../../../assets/img/imagen2.jpg",
  },
];
