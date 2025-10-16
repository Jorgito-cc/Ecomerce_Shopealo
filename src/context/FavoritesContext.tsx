import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import type { ProductDTO } from "../types/product";
import { getFavorites, addFavorite, removeFavorite } from "../api/favoriteApi";
import { useAuth } from "./AuthContext";

type FavoritesContextType = {
  favorites: ProductDTO[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: ProductDTO) => Promise<void>;
  refreshFavorites: () => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<ProductDTO[]>([]);
  const { isAuthenticated } = useAuth();

  // 🔁 Cargar favoritos al iniciar sesión
  useEffect(() => {
    if (isAuthenticated) {
      refreshFavorites();
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated]);

  const refreshFavorites = async () => {
    try {
      const favs = await getFavorites();
      setFavorites(favs);
    } catch (err) {
      console.error("Error cargando favoritos:", err);
    }
  };

  const isFavorite = (productId: number) =>
    favorites.some((p) => p.id === productId);

  const toggleFavorite = async (product: ProductDTO) => {
    try {
      if (!isAuthenticated) {
        toast.info("Debes iniciar sesión para usar favoritos 🔒");
        return;
      }

      if (isFavorite(product.id)) {
        await removeFavorite(product.id);
        setFavorites((prev) => prev.filter((p) => p.id !== product.id));
        toast.info("Producto eliminado de favoritos 🗑️");
      } else {
        await addFavorite(product.id);
        setFavorites((prev) => [...prev, product]);
        toast.success("Producto agregado a favoritos ❤️");
      }
    } catch (err: any) {
      toast.error("Error al actualizar favoritos ❌");
      console.error(err);
    }
  };

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, refreshFavorites }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
};
