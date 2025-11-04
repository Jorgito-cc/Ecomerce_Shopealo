import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // 👈 para obtener el id del producto actual
import { http } from "../../../api/http";
import { toast } from "react-toastify";
import { ProductCard } from "../../../shared/components/ProductCard";
import type { ProductDTO } from "../../../types/product";

type ItemRecomendacionResponse = {
  modelo: string;
  producto_base?: ProductDTO;
  recomendados: ProductDTO[];
};

type HybridRecomendacionResponse = {
  modelo: string;
  usuario: number;
  producto_base?: ProductDTO;
  recomendados: ProductDTO[];
  alpha?: number;
};

export const RecomendacionesPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // ✅ id del producto (si estamos en /product/:id)
  const [productos, setProductos] = useState<ProductDTO[]>([]);
  const [modelo, setModelo] = useState<string>("");
  const [productoBase, setProductoBase] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Selección de API base
  const FLASK_BASE = "https://flask-ml-service-production.up.railway.app";
  const BACKEND_BASE = "https://backend-ecommerce-production-0ef1.up.railway.app";

  // 🔁 Función: obtener recomendaciones desde el servicio adecuado
  const fetchRecomendaciones = async () => {
    setLoading(true);
    try {
      let data: ItemRecomendacionResponse | HybridRecomendacionResponse;

      if (id) {
        // 🧠 Si hay ID => intentamos con híbrido (prioridad) y fallback a item-based
        try {
          const res = await http.get<HybridRecomendacionResponse>(
            `${BACKEND_BASE}/api/v1/recomendaciones/hibrido/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          data = res.data;
          toast.success("Recomendaciones híbridas cargadas 🎯");
        } catch (hybridErr) {
          console.warn("Fallo híbrido, usando item-based...");
          const res = await http.get<ItemRecomendacionResponse>(
            `${FLASK_BASE}/recomendaciones/item/${id}`
          );
          data = res.data;
          toast.info("Recomendaciones basadas en producto 📦");
        }
      } else {
        // 🧍 Si no hay ID, usar recomendación por usuario
        const res = await http.get<HybridRecomendacionResponse>(
          `${BACKEND_BASE}/api/v1/recomendaciones/usuario`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        data = res.data;
        toast.success("Recomendaciones personalizadas cargadas 💡");
      }

      setModelo(data.modelo);
      setProductos(data.recomendados || []);
      setProductoBase((data as any).producto_base || null);
    } catch (err) {
      console.error("❌ Error al obtener recomendaciones:", err);
      toast.error("Error al obtener recomendaciones ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Cargar automáticamente
  useEffect(() => {
    fetchRecomendaciones();
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Recomendaciones 💡
      </h1>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p>Generando tus recomendaciones...</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-gray-500 italic">
            Modelo utilizado:{" "}
            <span className="font-semibold text-gray-800">
              {modelo || "N/A"}
            </span>
          </p>

          {productoBase && (
            <div className="flex items-center gap-4 mb-8 border-b pb-4">
              <img
                src={productoBase.urlImage}
                alt={productoBase.name}
                className="h-24 object-contain rounded"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Producto base:
                </h2>
                <p className="text-gray-600">{productoBase.name}</p>
                <p className="text-red-500 font-semibold">
                  Bs {productoBase.price}
                </p>
              </div>
            </div>
          )}

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
