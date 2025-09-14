// src/api/category.ts
import { http } from "./http";
import type { Category, CreateCategoryDTO, UpdateCategoryDTO } from "../types/category";

// GET /api/v1/category
export const getCategories = async (): Promise<Category[]> => {
  const { data } = await http.get<Category[]>("/api/v1/category");
  return data;
};

// GET /api/v1/category/:id
export const getCategory = async (id: number): Promise<Category> => {
  const { data } = await http.get<Category>(`/api/v1/category/${id}`);
  return data;
};

// POST /api/v1/category
export const createCategory = async (payload: CreateCategoryDTO): Promise<Category> => {
  const { data } = await http.post<Category>("/api/v1/category", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

// PATCH /api/v1/category/:id
export const updateCategory = async (id: number, payload: UpdateCategoryDTO): Promise<Category> => {
  const { data } = await http.patch<Category>(`/api/v1/category/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

// DELETE /api/v1/category/:id   (soft-delete en tu servicio)
export const deleteCategory = async (id: number): Promise<void> => {
  await http.delete(`/api/v1/category/${id}`);
};
