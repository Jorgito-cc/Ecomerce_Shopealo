import { http } from "./http";

type PaymentItem = {
  productId: number;
  quantity: number;
};

type CreatePaymentDTO = {
  items: PaymentItem[];
};

type CheckoutResponse = {
  sessionId: string;
  url: string;
  totalAmount: number;
};

const BASE = "/api/v1/payment";

export const createCheckoutSession = async (
  payload: CreatePaymentDTO
): Promise<CheckoutResponse> => {
  const { data } = await http.post<CheckoutResponse>(`${BASE}/checkout-session`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};