import type { Category } from "../../types/category";
import React from "react";

type Props = {
  category: Category;
};

export const CategoryCard: React.FC<Props> = ({ category }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 border rounded-md p-4 hover:bg-gray-100 transition cursor-pointer ">
      {/* Muestra el nombre */}
      <div className="text-sm font-medium">{category.name}</div>
      {/* Si la descripción existe, la muestra */}
      {category.description && (
        <div className="text-xs text-gray-500 text-center">{category.description}</div>
      )}
    </div>
  );
};