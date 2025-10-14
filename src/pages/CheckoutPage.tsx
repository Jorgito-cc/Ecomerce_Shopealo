// src/pages/CheckoutPage.tsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createCheckoutSession } from "../api/paymentApi";

export const CheckoutPage: React.FC = () => {
  const { items } = useCart();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para continuar con el pago.");
      return;
    }

    if (items.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        items: items.map((i) => ({
          productId: i.id,
          quantity: i.quantity,
        })),
      };

      const response = await createCheckoutSession(payload);
      console.log("Stripe Session:", response);

      // Redirigir a Stripe Checkout
      window.location.href = response.url;
    } catch (error) {
      console.error("Error creando sesión de pago:", error);
      alert("Hubo un error al crear la sesión de pago.");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">💳 Finalizar compra</h1>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Subtotal:</span>
          <span>Bs {subtotal.toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-60"
        >
          {loading ? "Procesando..." : "Pagar con tarjeta 💳"}
        </button>
      </div>
    </div>
  );
};
