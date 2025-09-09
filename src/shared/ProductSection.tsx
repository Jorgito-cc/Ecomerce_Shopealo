import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { ProductCard } from './components/ProductCard';
import type { Product } from '../core/entites/Product';
import { staticProducts } from '../features/products/infrastructure/data/staticProduct';

export const ProductSection: React.FC = () => {
  const [products] = useState<Product[]>(staticProducts.slice(0, 2)); // Solo 8 productos destacados
  const navigate = useNavigate();

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
