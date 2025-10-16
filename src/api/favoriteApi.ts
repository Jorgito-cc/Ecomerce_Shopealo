import { http } from "./http";
import type { ProductDTO } from "../types/product";

type FavoriteResponse = {
  id: number;
  producto: ProductDTO;
};

// ✅ Obtener todos los favoritos del usuario autenticado
export const getFavorites = async (): Promise<ProductDTO[]> => {
  const { data } = await http.get<FavoriteResponse[]>("/favoritos");
  // el backend devuelve un array de {id, producto}, mapeamos solo el producto
  return data.map((f) => f.producto);
};

// ✅ Agregar producto a favoritos
export const addFavorite = async (productId: number): Promise<ProductDTO> => {
  const { data } = await http.post<FavoriteResponse>(`favoritos/${productId}`, {});
  return data.producto;
};

// ✅ Eliminar producto de favoritos
export const removeFavorite = async (productId: number): Promise<void> => {
  await http.delete(`avoritos/${productId}`);
};
