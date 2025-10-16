import { http } from './http';

export type OrderItemDTO = {
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

export type OrderDTO = {
  id: number;
  status: string;
  total: number;
  createdAt: string;
  usuario: { id: number; name?: string; email?: string } | null;
  items: OrderItemDTO[];
};

export const getAllOrders = async (): Promise<OrderDTO[]> => {
  const { data } = await http.get<OrderDTO[]>('/api/v1/order');
  return data;
};
