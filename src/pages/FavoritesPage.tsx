import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { ProductCard } from '../shared/components/ProductCard';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Mis productos favoritos</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>No tienes productos favoritos todavía.</p>
          <p>Usa el ícono de corazón para agregarlos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};