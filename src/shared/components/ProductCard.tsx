import React from 'react';
import { FaHeart, FaEye } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { ProductDTO } from '../../types/product';

type Props = {
  product: ProductDTO;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [showAddToCart, setShowAddToCart] = React.useState(false);
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      image: product.urlImage,
      price: product.price,
      quantity: 1,
    });
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToFavorites = () => {
    // Aquí puedes agregar la lógica para añadir a favoritos, por ejemplo, usando un nuevo contexto
    alert('Producto añadido a favoritos. ¡Esto se implementará en otro componente!');
  };

  return (
    <div
      className="relative border p-4 rounded hover:shadow-md hover:scale-105 transition duration-300"
      onMouseEnter={() => setShowAddToCart(true)}
      onMouseLeave={() => setShowAddToCart(false)}
    >
      {/* Iconos de corazón y ojo */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={handleAddToFavorites}
          className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <FaHeart />
        </button>
        <button
          onClick={handleViewProduct}
          className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <FaEye />
        </button>
      </div>

      <img src={product.urlImage} alt={product.name} className="mx-auto h-36 object-contain" />
      <h3 className="mt-4 text-sm font-medium text-gray-800">{product.name}</h3>
      <div className="mt-2 text-sm text-red-600 font-semibold">
        ${product.price}
      </div>
      <div className="mt-1 text-xs text-gray-500">
        Stock disponible: {product.stock}
      </div>

      {showAddToCart && (
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 w-full py-2 bg-black text-white text-sm"
        >
          Añadir al carrito
        </button>
      )}
    </div>
  );
};