import { FaMobileAlt, FaLaptop, FaHeadphones, FaCamera, FaGamepad, FaClock } from "react-icons/fa";
import type { Category } from "../../../../core/entites/Category";

export const staticCategories:  Category[] = [
  { id: 1, name: "Phones", icon: <FaMobileAlt/> },
  { id: 2, name: "Computers", icon: <FaLaptop/> },
  { id: 3, name: "SmartWatch", icon: <FaClock /> },
  { id: 4, name: "Camera", icon: <FaCamera /> },
  { id: 5, name: "HeadPhones", icon: <FaHeadphones/> },
  { id: 6, name: "Gaming", icon: <FaGamepad /> },
];  