import { http } from "./http";

export type PaymentItem = {
  productId: number;
  quantity: number;
};

export type CreatePaymentDTO = {
  items: PaymentItem[];
};

export type CheckoutResponse = {
  sessionId: string;
  url: string;
  totalAmount: number;
};

const BASE = "/api/v1/payment";

export const createCheckoutSession = async (
  payload: CreatePaymentDTO
): Promise<CheckoutResponse> => {
  try {
    const { data } = await http.post<CheckoutResponse>(
      `${BASE}/checkout-session`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("✅ Respuesta de backend:", data);
    return data;
  } catch (error: any) {
    console.error("🚨 Error creando sesión de pago:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Error al crear sesión de pago"
    );
  }
};
