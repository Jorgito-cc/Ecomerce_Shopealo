import React, { createContext, useContext, useState, useMemo } from 'react';
import type { ProductDTO } from '../types/product';

type FavoritesContextType = {
  favorites: ProductDTO[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: ProductDTO) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<ProductDTO[]>([]);

  const toggleFavorite = (product: ProductDTO) => {
    setFavorites(prevFavorites => {
      const isFav = prevFavorites.some(p => p.id === product.id);
      if (isFav) {
        return prevFavorites.filter(p => p.id !== product.id);
      }
      return [...prevFavorites, product];
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.some(p => p.id === productId);
  };

  const value = useMemo(() => ({ favorites, isFavorite, toggleFavorite }), [favorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};