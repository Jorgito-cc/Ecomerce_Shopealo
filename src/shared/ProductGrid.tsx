import React, { useState } from 'react';
import { ProductCard } from './components/ProductCard';
import { staticProducts } from '../features/products/infrastructure/data/staticProduct';
import { staticCategories } from '../features/products/infrastructure/data/staticCategories';

export const ProductGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? staticProducts
      : staticProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="px-4 py-6">
      {/* Categorías */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          className={`px-4 py-2 border rounded-full ${selectedCategory === 'All' ? 'bg-black text-white' : 'bg-white text-black'}`}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        {staticCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full transition ${
              selectedCategory === cat.name ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      {/* Productos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No products found in this category.</div>
        )}
      </div>
    </div>
  );
};
