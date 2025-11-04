import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "./components/ProductCard";
import { getProducts } from "../api/productApi";
import type { ProductDTO } from "../types/product";
import { SeccionRecomendaciones } from "../features/admin/pages/SeccionRecomedaciones";
import { DescuentoProductos } from "../features/admin/pages/DescuentoProductos";

export const ProductSection: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 8));
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error al cargar los productos. Por favor, inténtelo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-8 text-center">
        Cargando los mejores productos...
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-8 text-center text-red-500">
        {error}
      </section>
    );
  }

  return (
    <section className="px-4 py-8 space-y-10">
      <DescuentoProductos/>
      {/* 🧠 Sección de recomendaciones (antes de productos normales) */}
      <SeccionRecomendaciones />

      {/* 🛍️ Sección de productos normales */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-red-500 font-semibold">
              Sección de Productos
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Productos
            </h2>
          </div>
          <button
            onClick={() => navigate("/all-products")}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Ver todo
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
