import {
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaCamera,
  FaGamepad,
  FaClock,
  FaTabletAlt,
  FaTv,
  FaKeyboard,
  FaMouse,
  FaMicrochip,
  FaChargingStation,
  FaTools,
} from "react-icons/fa";
import type { Category } from "../../../../core/entites/Category";

export const staticCategories: Category[] = [
  { id: 1, name: "Phones", icon: <FaMobileAlt /> },
  { id: 2, name: "Computers", icon: <FaLaptop /> },
  { id: 3, name: "SmartWatch", icon: <FaClock /> },
  { id: 4, name: "Cameras", icon: <FaCamera /> },
  { id: 5, name: "Headphones", icon: <FaHeadphones /> },
  { id: 6, name: "Gaming", icon: <FaGamepad /> },
  { id: 7, name: "Tablets", icon: <FaTabletAlt /> },
  { id: 8, name: "Smart TVs", icon: <FaTv /> },
  { id: 9, name: "Keyboards", icon: <FaKeyboard /> },
  { id: 10, name: "Mice", icon: <FaMouse /> },
  { id: 11, name: "Components", icon: <FaMicrochip /> },
  { id: 12, name: "Chargers", icon: <FaChargingStation /> },
  { id: 13, name: "Accessories", icon: <FaTools /> },
];
