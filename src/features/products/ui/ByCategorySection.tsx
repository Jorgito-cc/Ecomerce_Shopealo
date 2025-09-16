import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CategoryCard } from "../../../shared/components/CategoryCard";

import "./style.css";
import type { Category } from "../../../types/category";
import { getCategories } from "../../../api/categoryApi";

export const ByCategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Error al cargar las categorías. Inténtelo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        Cargando categorías...
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12 text-center text-red-500">
        {error}
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <hr className="mt-5 p-4" />
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-red-500 font-medium text-sm">Categorias</span>
          <h2 className="text-3xl font-bold">seccion de categorias </h2>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border rounded-full hover:bg-gray-100">
            <FaChevronLeft />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-100">
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto scroll-hidden">
        <div className="flex gap-4 w-max px-1">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
      <hr className="mt-9" />
    </section>
  );
};