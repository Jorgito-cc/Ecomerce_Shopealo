import React, { useEffect, useState } from "react";
import { http } from "../api/http";
import { format } from "date-fns";

interface Product {
  id: number;
  name: string;
  price: number;
  urlImage?: string;
}

interface Descuento {
  id: number;
  porcentaje: number;
  precio: number;
  precioFinal: number;
  fechaInicio: string;
  fechaFin: string;
  producto: Product;
}

export const DescuentoProductos: React.FC = () => {
  const [descuentos, setDescuentos] = useState<Descuento[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDescuentos = async () => {
    try {
      setLoading(true);
      const { data } = await http.get<Descuento[]>("/api/v1/descuento");
      // ✅ Filtramos solo los descuentos activos (por fecha actual y estado)
      const hoy = new Date();
   const activos = data.filter(
  (d: Descuento) =>
    new Date(d.fechaInicio) <= hoy && new Date(d.fechaFin) >= hoy
);

      setDescuentos(activos);
    } catch (error) {
      console.error("Error cargando descuentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDescuentos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-blue-600 font-semibold">Cargando descuentos...</p>
      </div>
    );
  }

  if (descuentos.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-medium">
        No hay descuentos activos por el momento 😔
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        🛍️ Productos con Descuento
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {descuentos.map((d) => (
          <div
            key={d.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200"
          >
            {/* Imagen del producto */}
            {d.producto?.urlImage ? (
              <img
                src={d.producto.urlImage}
                alt={d.producto.name}
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">
                Sin imagen
              </div>
            )}

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {d.producto.name}
              </h2>

              {/* Porcentaje */}
              <div className="mt-1 flex items-center gap-2">
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                  -{d.porcentaje}%
                </span>
                <span className="text-gray-400 text-sm">
                  hasta {format(new Date(d.fechaFin), "dd/MM/yyyy")}
                </span>
              </div>

              {/* Precio */}
              <div className="mt-3">
                <p className="text-gray-500 line-through text-sm">
                  {d.precio.toFixed(2)} Bs.
                </p>
                <p className="text-green-600 font-bold text-xl">
                  {d.precioFinal.toFixed(2)} Bs.
                </p>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Ver producto
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
