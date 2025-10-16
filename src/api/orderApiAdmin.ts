// src/api/orderApiAdmin.ts
import { http } from "./http";

export type OrderProduct = {
  id: number;
  quantity: number;
  subtotal: number;
  product: {
    id: number;
    name: string;
    price: number;
    urlImage: string;
  };
};

export type OrderAdmin = {
  id: number;
  total: number;
  status: string;
  date: string;
  usuario?: {
    id: number;
    nombre?: string;
    email?: string;
  };
  orderProducts: OrderProduct[];
};

export const getAllOrders = async (): Promise<OrderAdmin[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token no encontrado. Usuario no autenticado.");

  const { data } = await http.get<OrderAdmin[]>("/api/v1/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("📦 Órdenes de todos los usuarios:", data);
  return data;
};
