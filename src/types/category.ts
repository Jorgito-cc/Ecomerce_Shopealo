// src/types/category.ts
export type Category = {
  id: number;
  name: string;
  description?: string | null;
  createdAt: string;
  updateAt: string;
  deletedAt?: string | null;
};

export type CreateCategoryDTO = {
  name: string;          // requerido, máx 50
  description?: string;  // opcional
};

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;
