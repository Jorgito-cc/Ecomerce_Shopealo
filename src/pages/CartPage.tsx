// src/pages/CartPage.tsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { CartItem } from '../shared/components/CartItem';
import { CouponInput } from '../shared/components/CouponInput';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { items } = useCart();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lista de productos------------------ */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <div className="flex justify-between">
              <Link to="/" className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">
                Volver a la tienda
              </Link>
              <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                Actualizar carrito
              </button>
            </div>

            <CouponInput />
          </div>

          {/* Resumen */}
          <div className="bg-gray-100 p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Resumen del Carrito</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>Bs {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Envío:</span>
              <span>Gratis</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total:</span>
              <span>Bs {subtotal.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Proceder al pago
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
