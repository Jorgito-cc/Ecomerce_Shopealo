import React, { useEffect, useState } from "react";
import { http } from "../../../api/http";
import { ProductCard } from "../../../shared/components/ProductCard";
import type { ProductDTO } from "../../../types/product";

export const SeccionRecomendaciones: React.FC = () => {
  const [recomendados, setRecomendados] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecomendaciones = async () => {
      try {
        const res = await http.get("/api/v1/recomendaciones/usuario");
        const data = res.data;
        setRecomendados(data.recomendados || []);
      } catch (err) {
        console.error("Error al obtener recomendaciones:", err);
        setError("No se pudieron cargar las recomendaciones 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchRecomendaciones();
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-8 text-center text-gray-600">
        Cargando productos recomendados...
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

  if (!recomendados.length) {
    return (
      <section className="px-4 py-8 text-center text-gray-500">
        No hay recomendaciones disponibles por ahora.
      </section>
    );
  }

  return (
    <section className="px-4 py-10">
      {/* 🔴 Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-red-500 font-semibold">
            Basado en tus intereses
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Recomendados para ti
          </h2>
        </div>
      </div>

      {/* 🧱 Grid de productos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {recomendados.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
