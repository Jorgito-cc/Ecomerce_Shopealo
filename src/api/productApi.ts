import { http } from "./http";
import type { ProductDTO, CreateProductDTO, UpdateProductDTO } from "../types/product";

const BASE = "/api/v1/product";

export const getProducts = async (): Promise<ProductDTO[]> => {
  const { data } = await http.get<ProductDTO[]>(BASE);
  return data;
};

export const getProductById = async (id: number): Promise<ProductDTO> => {
  const { data } = await http.get<ProductDTO>(`${BASE}/${id}`);
  return data;
};

export const createProduct = async (payload: CreateProductDTO): Promise<ProductDTO> => {
  const { data } = await http.post<ProductDTO>(BASE, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

export const updateProduct = async (id: number, payload: UpdateProductDTO): Promise<ProductDTO> => {
  const { data } = await http.patch<ProductDTO>(`${BASE}/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await http.delete(`${BASE}/${id}`);
};
