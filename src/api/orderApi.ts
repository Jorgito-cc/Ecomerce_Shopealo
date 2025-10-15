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
export const getClientOrders = async (): Promise<Order[]> => {
  const { data } = await http.get<Order[]>("/api/v1/order/client-history", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
