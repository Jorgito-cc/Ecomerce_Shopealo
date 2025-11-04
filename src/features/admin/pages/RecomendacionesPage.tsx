import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../../../api/http";
import { toast } from "react-toastify";
import { ProductCard } from "../../../shared/components/ProductCard";
import type { ProductDTO } from "../../../types/product";

type ItemRecomendacionResponse = {
  modelo: string;
  producto_base: ProductDTO;
  recomendados: ProductDTO[];
};

type HybridRecomendacionResponse = {
  modelo: string;
  usuario?: number;
  producto_base: ProductDTO;
  recomendados: ProductDTO[];
  alpha?: number;
};

export const RecomendacionesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ✅ siempre debe venir el id del producto
  const [productos, setProductos] = useState<ProductDTO[]>([]);
  const [modelo, setModelo] = useState<string>("");
  const [productoBase, setProductoBase] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // URLs base
  const FLASK_BASE = "https://flask-ml-service-production.up.railway.app";
  const BACKEND_BASE = "https://backend-ecommerce-production-0ef1.up.railway.app";

  // 🔁 Solo consume el producto actual (híbrido o item-based)
  const fetchRecomendacionesPorProducto = async () => {
    if (!id) return;

    setLoading(true);
    try {
      // Primero intenta con el híbrido
      let data: HybridRecomendacionResponse | ItemRecomendacionResponse;
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
      } catch (err) {
        console.warn("⚠️ Híbrido no disponible, usando item-based...");
        const res = await http.get<ItemRecomendacionResponse>(
          `${FLASK_BASE}/recomendaciones/item/${id}`
        );
        data = res.data;
        toast.info("Recomendaciones basadas en producto 📦");
      }

      setModelo(data.modelo);
      setProductoBase(data.producto_base);
      setProductos(data.recomendados || []);
    } catch (error) {
      console.error("❌ Error al obtener recomendaciones:", error);
      toast.error("Error al obtener recomendaciones ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Cargar al montar o cambiar de producto
  useEffect(() => {
    fetchRecomendacionesPorProducto();
  }, [id]);

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        Recomendaciones <span className="text-yellow-500">💡</span>
      </h2>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p>Generando recomendaciones para este producto...</p>
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
            <div className="flex items-center gap-4 mb-6 border-b pb-4">
              <img
                src={productoBase.urlImage}
                alt={productoBase.name}
                className="h-20 w-20 object-contain rounded"
              />
              <div>
                <h3 className="font-semibold text-gray-800">Producto base:</h3>
                <p className="text-gray-600">{productoBase.name}</p>
                <p className="text-red-500 font-semibold">
                  Bs {productoBase.price}
                </p>
              </div>
            </div>
          )}

          {productos.length === 0 ? (
            <p className="text-center text-gray-500">
              No hay productos recomendados para este artículo.
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
