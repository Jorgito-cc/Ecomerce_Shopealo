import { http } from "./http";
import type { ProductDTO } from "../types/product";

type FavoriteResponse = {
  id: number;
  producto: ProductDTO;
};

// ✅ Obtener todos los favoritos del usuario
export const getFavorites = async (): Promise<ProductDTO[]> => {
  const { data } = await http.get<FavoriteResponse[]>("/api/v1/favoritos", {
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  });
  // Extraemos solo el producto de cada favorito
  return data.map((f) => f.producto);
};

// ✅ Agregar producto a favoritos
export const addFavorite = async (productId: number): Promise<ProductDTO> => {
  const { data } = await http.post<FavoriteResponse>(
    `/api/v1/favoritos/${productId}`,
    {},
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    }
  );
  return data.producto;
};

// ✅ Eliminar producto de favoritos
export const removeFavorite = async (productId: number): Promise<void> => {
  await http.delete(`/api/v1/favoritos/${productId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  });
};
