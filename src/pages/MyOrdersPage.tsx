import React, { useEffect, useState } from 'react';

// Se puede reusar el tipo CartItem de tu CartContext
import type { CartItem } from '../context/CartContext';

// Define el tipo de dato para una orden
type Order = {
  id: number;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
};

// Datos simulados (lo que tu API de órdenes devolvería)
const dummyOrders: Order[] = [
  {
    id: 1,
    date: '2025-09-10',
    total: 345,
    status: 'Delivered',
    items: [
      { id: 1, name: 'Teclado mecánico', image: 'https://via.placeholder.com/150', price: 60, quantity: 1 },
      { id: 2, name: 'Mouse gamer', image: 'https://via.placeholder.com/150', price: 30, quantity: 2 },
    ],
  },
  {
    id: 2,
    date: '2025-09-12',
    total: 250,
    status: 'Shipped',
    items: [
      { id: 3, name: 'Monitor gamer', image: 'https://via.placeholder.com/150', price: 250, quantity: 1 },
    ],
  },
  {
    id: 3,
    date: '2025-09-15',
    total: 900,
    status: 'Processing',
    items: [
      { id: 9, name: 'Celular X Ultra', image: 'https://via.placeholder.com/150', price: 900, quantity: 1 },
    ],
  },
];

export const MyOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Simula una llamada a una API para obtener las órdenes
  useEffect(() => {
    const fetchOrders = () => {
      setLoading(true);
      setTimeout(() => {
        setOrders(dummyOrders);
        setLoading(false);
      }, 1000); // Simula 1 segundo de espera de la red
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Cargando tus órdenes...</div>;
  }

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
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">Orden #{order.id}</h2>
                  <p className="text-sm text-gray-500">Fecha: {order.date}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">${item.price} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t text-right">
                <span className="text-lg font-bold">Total: ${order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};