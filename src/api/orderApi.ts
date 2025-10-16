import { http } from "./http";

export type OrderProduct = {
  id: number;
  quantity: number;
  subtotal: number;
  product: {
    id: number;
    name: string;
    urlImage: string;
    price: number;
  };
};

export type Order = {
  id: number;
  total: number;
  status: string;
  date: string;
  orderProducts: OrderProduct[];
};

// 🔥 Llama al endpoint protegido del backend
// 🔥 Llama al endpoint protegido del backend
export const getClientOrders = async (): Promise<Order[]> => {
  const token = localStorage.getItem("access_token"); // ✅ corregido
  if (!token) {
    throw new Error("Token no encontrado. El usuario no está autenticado.");
  }

  const { data } = await http.get<Order[]>("/api/v1/order/client-history", {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("🟢 Órdenes recibidas:", data);
  return data;
};

