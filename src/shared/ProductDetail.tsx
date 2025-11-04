import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/productApi';
import type { ProductDTO } from '../types/product';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { RecomendacionesPage } from '../features/admin/pages/RecomendacionesPage';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await getProductById(parseInt(id));
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('No se pudo cargar la información del producto.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        image: product.urlImage,
        price: product.price,
        quantity: 1,
      });
      alert(`¡${product.name} ha sido añadido al carrito!`);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Cargando detalles del producto...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Producto no encontrado.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-shrink-0">
          <img src={product.urlImage} alt={product.name} className="w-80 h-80 object-contain" />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="text-2xl font-bold text-red-600 mb-4">
            Bs {product.price}
          </div>
          <p className="text-gray-500 mb-4">
            Stock disponible: <span className="font-semibold">{product.stock}</span>
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
       {/* tu bloque de detalle del producto */}
      <RecomendacionesPage key={id} /> {/* 👈 fuerza remount cuando cambia el producto */}
    </div>
  );
};