// src/pages/CheckoutPage.tsx
import React from 'react';
import { BillingForm } from '../shared/components/BillingForm';
import { useCart } from '../context/CartContext';

export const CheckoutPage: React.FC = () => {
  const { items } = useCart();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Formulario */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Detalles de Facturación</h2>
        <BillingForm />
      </div>

      {/* Resumen */}
      <div className="bg-gray-100 p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Resumen de tu pedido</h2>

        <ul className="space-y-2 mb-4">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Envío:</span>
          <span>Gratis</span>
        </div>
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Método de Pago</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" defaultChecked />
              Transferencia bancaria
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" />
              Contra entrega
            </label>
          </div>
        </div>

        <input
          type="text"
          placeholder="Código de cupón"
          className="w-full border px-3 py-2 rounded mb-2"
        />
        <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Aplicar Cupón
        </button>

        <button className="w-full bg-green-600 text-white mt-4 py-2 rounded hover:bg-green-700">
          Realizar Pedido
        </button>
      </div>
    </div>
  );
};
