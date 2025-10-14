import React from "react";
import { useSearchParams } from "react-router-dom";

export const OrderSuccessPage: React.FC = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 ¡Pago realizado con éxito!
      </h1>
      <p className="text-gray-600 mb-6">
        Gracias por tu compra. Tu ID de sesión es:{" "}
        <span className="font-mono">{sessionId}</span>
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Volver a la tienda
      </a>
    </div>
  );
};
