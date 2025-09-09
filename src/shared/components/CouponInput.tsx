import React from 'react';

type Props = {
  className?: string;
};

export const CouponInput: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
        Código de cupón
      </label>
      <div className="flex gap-2">
        <input
          id="coupon"
          type="text"
          placeholder="Ingresa tu cupón"
          className="border rounded px-3 py-2 w-full"
        />
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Aplicar
        </button>
      </div>
    </div>
  );
};
