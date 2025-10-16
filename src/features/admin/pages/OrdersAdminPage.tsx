// src/features/admin/pages/OrdersAdminPage.tsx
import React, { useEffect, useState } from 'react';
import { getAllOrders, type OrderDTO } from '../../../api/orderApiAdmin';

export const OrdersAdminPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null); // fila expandida

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (e: any) {
        setErr(e?.response?.data?.message ?? 'No se pudo cargar las órdenes');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Órdenes</h1>
        <div className="animate-pulse text-gray-500">Cargando…</div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Órdenes</h1>
        <div className="text-red-600">{err}</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Órdenes</h1>
        <span className="text-sm text-gray-500">{orders.length} resultados</span>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Cliente</th>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-center">Items</th>
              <th className="px-4 py-3 text-center">Detalle</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((o) => {
              const itemsCount = o.items.reduce((acc, it) => acc + it.quantity, 0);
              const openRow = open === o.id;
              return (
                <React.Fragment key={o.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">{o.id}</td>
                    <td className="px-4 py-3">
                      {o.usuario?.name || '—'}
                      <div className="text-xs text-gray-500">{o.usuario?.email || '—'}</div>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(o.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          o.status === 'PENDIENTE'
                            ? 'bg-yellow-100 text-yellow-800'
                            : o.status === 'PAGADO'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      Bs {o.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">{itemsCount}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setOpen(openRow ? null : o.id)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        {openRow ? 'Ocultar' : 'Ver'}
                      </button>
                    </td>
                  </tr>

                  {openRow && (
                    <tr className="bg-gray-50/60">
                      <td colSpan={7} className="px-4 pb-4">
                        <div className="mt-2 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {o.items.map((it) => (
                            <div
                              key={it.id}
                              className="flex gap-3 border rounded-lg p-3 bg-white"
                            >
                              <img
                                src={it.product.urlImage}
                                alt={it.product.name}
                                className="h-16 w-16 object-contain rounded"
                              />
                              <div className="flex-1">
                                <div className="font-medium">{it.product.name}</div>
                                <div className="text-xs text-gray-500">
                                  Cantidad: {it.quantity} · Precio: Bs {it.product.price.toFixed(2)}
                                </div>
                                <div className="text-sm font-semibold">
                                  Subtotal: Bs {it.subtotal.toFixed(2)}
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
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
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
