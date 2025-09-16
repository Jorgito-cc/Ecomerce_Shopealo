import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from './components/ProductCard';
import { getProducts } from '../api/productApi';
import type { ProductDTO } from '../types/product';

export const ProductSection: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // You can still slice the array to show a limited number of products
        setProducts(data.slice(0, 8));
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error al cargar los productos. Por favor, inténtelo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-8 text-center">
        Cargando los mejores productos...
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-8 text-center text-red-500">
        {error}
      </section>
    );
  }

  return (
    <section className="px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-red-500 font-semibold">This Month</p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Best Selling Products</h2>
        </div>
        <button
          onClick={() => navigate('/all-products')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          View All
        </button>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};