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

  const fetchRecomendaciones = async () => {
    try {
      const { data } = await http.get<RecomendacionResponse>("/api/v1/recomendaciones/usuario", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setProductos(data.recomendados);
      setModelo(data.modelo);
      toast.success("Recomendaciones cargadas con éxito 🎯");
    } catch (err) {
      console.error(err);
      toast.error("Error al obtener recomendaciones ❌");
    }
  };

  const retrainModel = async () => {
    try {
      const { data } = await http.get("/api/v1/recomendaciones/reentrenar", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.info(data.message || "Modelos reentrenados 🔁");
    } catch (err) {
      toast.error("Error al reentrenar modelos ❌");
    }
  };

  useEffect(() => {
    fetchRecomendaciones();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Recomendaciones personalizadas 💡
        </h1>
        <button
          onClick={retrainModel}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Reentrenar modelos
        </button>
      </div>

      <p className="mb-4 text-gray-500 italic">
        Basado en el modelo: <span className="font-semibold">{modelo}</span>
      </p>

      {productos.length === 0 ? (
        <p className="text-center text-gray-500">No hay recomendaciones disponibles.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {productos.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
