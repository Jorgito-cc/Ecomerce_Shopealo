// src/shared/components/CartItem.tsx
import React from 'react';
import { CartItem as CartItemType, useCart } from '../../context/CartContext';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-sm text-gray-600">${item.price}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          className="w-16 text-center border rounded"
          min={1}
        />
        <button onClick={() => removeItem(item.id)} className="text-red-500">
          Eliminar
        </button>
      </div>
    </div>
  );
};
