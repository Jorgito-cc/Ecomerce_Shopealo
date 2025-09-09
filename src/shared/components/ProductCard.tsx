import React from 'react';
import { FaHeart, FaEye } from 'react-icons/fa';
import type { Product } from '../../core/entites/Product';
import { useCart } from '../../context/CartContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [showAddToCart, setShowAddToCart] = React.useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div
      className="relative border p-4 rounded hover:shadow-md hover:scale-105 transition duration-300"
      onMouseEnter={() => setShowAddToCart(true)}
      onMouseLeave={() => setShowAddToCart(false)}
    >
      <div className="absolute top-2 right-2 flex gap-2">
        <button className="bg-white p-2 rounded-full shadow"><FaHeart /></button>
        <button className="bg-white p-2 rounded-full shadow"><FaEye /></button>
      </div>
      <img src={product.image} alt={product.name} className="mx-auto h-36 object-contain" />
      <h3 className="mt-4 text-sm font-medium text-gray-800">{product.name}</h3>
      <div className="mt-2 text-sm text-red-600 font-semibold">
        ${product.price.toFixed(2)}{' '}
        {product.oldPrice && (
          <span className="text-gray-500 line-through ml-2">
            ${product.oldPrice.toFixed(2)}
          </span>
        )}
      </div>
      <div className="mt-1 text-xs text-yellow-500">
        {'★'.repeat(product.rating || 5)} <span className="text-gray-500 ml-1">({product.reviews || 65})</span>
      </div>

      {showAddToCart && (
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 w-full py-2 bg-black text-white text-sm"
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};
