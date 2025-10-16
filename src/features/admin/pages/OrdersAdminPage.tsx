// src/features/admin/pages/OrdersAdminPage.tsx
import React, { useEffect, useState } from "react";
import { getAllOrders, type OrderAdmin } from "../../../api/orderApiAdmin";

const OrdersAdminPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err: any) {
        console.error("Error obteniendo órdenes:", err);
        setError("No se pudieron cargar las órdenes.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-600">
        <svg
          className="animate-spin h-8 w-8 mb-3 text-indigo-600"
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
        Cargando órdenes...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 py-16 font-medium">{error}</div>
    );

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Órdenes de todos los usuarios
        </h1>
        <span className="text-sm text-gray-500">
          {orders.length} registros
        </span>
      </div>

      <div className="overflow-x-auto bg-white border rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Usuario</th>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-center">Detalle</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => {
              const openRow = open === order.id;
              return (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">
                      {order.usuario?.nombre ?? "—"}
                      <div className="text-xs text-gray-500">
                        {order.usuario?.email ?? "—"}
                      </div>
                    </td>
                    <td className="px-4 py-3">{order.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "PAGADO"
                            ? "bg-green-100 text-green-700"
                            : order.status === "PENDIENTE"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      Bs {Number(order.total).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setOpen(openRow ? null : order.id)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        {openRow ? "Ocultar" : "Ver"}
                      </button>
                    </td>
                  </tr>

                  {openRow && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="p-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {Array.isArray(order.orderProducts) &&
                            order.orderProducts.map((item) => (
                              <div
                                key={item.id}
                                className="flex gap-3 border rounded-lg p-3 bg-white"
                              >
                                <img
                                  src={item.product.urlImage}
                                  alt={item.product.name}
                                  className="h-16 w-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <div className="font-medium">
                                    {item.product.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Cantidad: {item.quantity} · Precio: Bs{" "}
                                    {Number(item.product.price).toFixed(2)}
                                  </div>
                                  <div className="text-sm font-semibold">
                                    Subtotal: Bs{" "}
                                    {(Number(item.product.price) * item.quantity).toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}

            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No hay órdenes registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersAdminPage;
