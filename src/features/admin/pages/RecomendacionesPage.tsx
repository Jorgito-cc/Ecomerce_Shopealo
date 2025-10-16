// src/pages/RecomendacionesPage.tsx
import React, { useEffect, useState } from "react";
import { http } from "../../../api/http";
import { toast } from "react-toastify";
import { ProductCard } from "../../../shared/components/ProductCard";
import type { ProductDTO } from "../../../types/product";

type RecomendacionResponse = {
  modelo: string;
  usuario: number;
  recomendados: ProductDTO[];
};

export const RecomendacionesPage: React.FC = () => {
  const [productos, setProductos] = useState<ProductDTO[]>([]);
  const [modelo, setModelo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // 🔁 Función para reentrenar modelos automáticamente
  const retrainModel = async () => {
    try {
      const { data } = await http.get("/api/v1/recomendaciones/reentrenar", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.info(data.message || "Modelos reentrenados con éxito 🔁");
      return true;
    } catch (err) {
      console.error("❌ Error al reentrenar modelos:", err);
      toast.error("Error al reentrenar modelos ❌");
      return false;
    }
  };

  // 📦 Función para obtener recomendaciones
  const fetchRecomendaciones = async () => {
    try {
      const { data } = await http.get<RecomendacionResponse>(
        "/api/v1/recomendaciones/usuario",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setProductos(data.recomendados);
      setModelo(data.modelo);
      toast.success("Recomendaciones cargadas con éxito 🎯");
    } catch (err) {
      console.error("❌ Error al obtener recomendaciones:", err);
      toast.error("Error al obtener recomendaciones ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Al montar la página → reentrena y luego trae recomendaciones
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const ok = await retrainModel(); // se reentrena automáticamente
      if (ok) await fetchRecomendaciones();
      else setLoading(false);
    };
    init();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Recomendaciones personalizadas 💡
      </h1>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p>Generando tus recomendaciones...</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-gray-500 italic">
            Basado en el modelo:{" "}
            <span className="font-semibold">{modelo || "N/A"}</span>
          </p>

          {productos.length === 0 ? (
            <p className="text-center text-gray-500">
              No hay recomendaciones disponibles.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {productos.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
