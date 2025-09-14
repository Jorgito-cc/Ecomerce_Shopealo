// src/types/product.ts
export type ProductDTO = {
  id: number;
  name: string;
  description: string;
  price: number;     // en tu back es decimal, acá number
  stock?: number;
  stock_minimo?: number;
  urlImage: string;
  // Si luego agregas relación:
  // category?: { id: number; name: string }
};

export type CreateProductDTO = {
  name: string;
  description: string;
  price: number;
  stock?: number;
  stock_minimo?: number;
  urlImage: string;
};

export type UpdateProductDTO = Partial<CreateProductDTO>;
