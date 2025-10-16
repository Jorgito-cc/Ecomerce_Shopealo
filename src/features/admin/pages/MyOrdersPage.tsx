import React, { useEffect, useState } from "react";
import { getClientOrders } from "./../../../api/orderApi";
import type { Order } from "../../../api/orderApi";


export const MyOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getClientOrders();
        setOrders(data);
      } catch (err: any) {
        console.error("Error obteniendo órdenes:", err);
        setError("No se pudieron cargar tus órdenes.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
if (loading)
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-600">
      <svg
        className="animate-spin h-8 w-8 mb-3 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      Cargando tus órdenes...
    </div>
  );

  if (error)
    return (
      <div className="text-center text-red-500 py-20 font-medium">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mis Órdenes</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>No tienes órdenes previas.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">
                    Orden #{order.id}
                  </h2>
                  <p className="text-sm text-gray-500">Fecha: {order.date}</p>
                </div>
            <span
  className={`px-3 py-1 text-sm font-medium rounded-full ${
    order.status === "PAGADO"
      ? "bg-green-100 text-green-700"
      : order.status === "PENDIENTE"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-700"
  }`}
>
  {order.status}
</span>

              </div>

              <div className="space-y-4">
                {order.orderProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-2"
                  >
                    <img
                      src={item.product.urlImage}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">
  Bs {Number(item.product.price)} × {item.quantity}
</p>

                    </div>
                    <div className="ml-auto font-semibold">
Bs {(Number(item.product.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t text-right">
                <span className="text-lg font-bold text-gray-800">
                  Total: Bs {order.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};