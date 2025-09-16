import React, { useEffect, useState } from 'react';
import { ProductCard } from './components/ProductCard';
import { getProducts } from '../api/productApi';
import type { ProductDTO } from '../types/product';
import type { Category } from '../types/category';
import { getCategories } from '../api/categoryApi';

export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos. Por favor, inténtelo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCategoryId === null
    ? products
    : products.filter(p => p.categoryId === selectedCategoryId);

  if (loading) {
    return <div className="text-center py-10">Cargando productos y categorías...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="px-4 py-6">
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          className={`px-4 py-2 border rounded-full transition ${selectedCategoryId === null ? 'bg-black text-white' : 'bg-white text-black'}`}
          onClick={() => setSelectedCategoryId(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryId(cat.id)}
            className={`px-4 py-2 border rounded-full transition ${selectedCategoryId === cat.id ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No se encontraron productos en esta categoría.</div>
        )}
      </div>
    </div>
  );
};