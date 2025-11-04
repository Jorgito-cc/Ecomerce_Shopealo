import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { http } from "../../../api/http";
import { format } from "date-fns";

interface Product {
  id: number;
  name: string;
  price: number;
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

interface FormValues {
  productoId: number;
  porcentaje: number;
  precio: number;
  fechaInicio: string;
  fechaFin: string;
}

export const DescuentoPage: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [descuentos, setDescuentos] = useState<Descuento[]>([]);
  const [loading, setLoading] = useState(false);
  const [precioFinalPreview, setPrecioFinalPreview] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const loadProductos = async () => {
    const { data } = await http.get<Product[]>("/api/v1/product");
    setProductos(data);
  };

  const loadDescuentos = async () => {
    const { data } = await http.get<Descuento[]>("/api/v1/descuento");
    setDescuentos(data);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const payload = {
        productoId: Number(data.productoId),
        porcentaje: Number(data.porcentaje),
        precio: Number(data.precio),
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
      };

      await http.post("/api/v1/descuento", payload, {
        headers: { "Content-Type": "application/json" },
      });

      reset();
      setPrecioFinalPreview(null);
      await loadDescuentos();
      alert("✅ Descuento creado correctamente");
    } catch (error: any) {
      console.error(error);
      alert("❌ Error al crear descuento");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Calcular el precio final automáticamente
  const precio = watch("precio");
  const porcentaje = watch("porcentaje");

  useEffect(() => {
    if (precio && porcentaje) {
      const final = Number(precio) - (Number(precio) * Number(porcentaje)) / 100;
      setPrecioFinalPreview(final);
    } else {
      setPrecioFinalPreview(null);
    }
  }, [precio, porcentaje]);

  useEffect(() => {
    loadProductos();
    loadDescuentos();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">
        Gestión de Descuentos
      </h1>

      {/* Formulario con React Hook Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl p-6 mb-10"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Producto */}
          <div>
            <label className="block font-semibold mb-1">Producto</label>
            <select
              {...register("productoId", { required: "Selecciona un producto" })}
              className="w-full border rounded-md p-2"
            >
              <option value="">-- Selecciona un producto --</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.productoId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productoId.message}
              </p>
            )}
          </div>

          {/* Porcentaje */}
          <div>
            <label className="block font-semibold mb-1">Porcentaje (%)</label>
            <input
              type="number"
              step="0.1"
              className="w-full border rounded-md p-2"
              placeholder="Ej. 10"
              {...register("porcentaje", {
                required: "Campo obligatorio",
                min: { value: 1, message: "Debe ser al menos 1%" },
                max: { value: 100, message: "No puede superar 100%" },
              })}
            />
            {errors.porcentaje && (
              <p className="text-red-500 text-sm mt-1">
                {errors.porcentaje.message}
              </p>
            )}
          </div>

          {/* Precio */}
          <div>
            <label className="block font-semibold mb-1">Precio base</label>
            <input
              type="number"
              step="0.01"
              className="w-full border rounded-md p-2"
              placeholder="Ej. 100.00"
              {...register("precio", {
                required: "Campo obligatorio",
                min: { value: 0.01, message: "Debe ser mayor a 0" },
              })}
            />
            {errors.precio && (
              <p className="text-red-500 text-sm mt-1">
                {errors.precio.message}
              </p>
            )}
          </div>

          {/* Fecha inicio */}
          <div>
            <label className="block font-semibold mb-1">Fecha inicio</label>
            <input
              type="date"
              className="w-full border rounded-md p-2"
              {...register("fechaInicio", { required: "Selecciona una fecha" })}
            />
            {errors.fechaInicio && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fechaInicio.message}
              </p>
            )}
          </div>

          {/* Fecha fin */}
          <div>
            <label className="block font-semibold mb-1">Fecha fin</label>
            <input
              type="date"
              className="w-full border rounded-md p-2"
              {...register("fechaFin", { required: "Selecciona una fecha" })}
            />
            {errors.fechaFin && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fechaFin.message}
              </p>
            )}
          </div>
        </div>

        {/* 💰 Preview del precio final */}
        {precioFinalPreview && (
          <div className="mt-4 text-green-700 font-semibold text-lg">
            💰 Precio final estimado: {precioFinalPreview.toFixed(2)} Bs.
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Guardando..." : "Guardar descuento"}
        </button>
      </form>

      {/* Lista de descuentos */}
      <h2 className="text-xl font-bold mb-3">Descuentos registrados</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {descuentos.map((d) => (
          <div
            key={d.id}
            className="border rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-blue-700">{d.producto.name}</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(d.fechaInicio), "dd/MM/yyyy")} →{" "}
              {format(new Date(d.fechaFin), "dd/MM/yyyy")}
            </p>
            <p className="mt-1 text-gray-700">
              <span className="font-semibold">{d.porcentaje}%</span> off
            </p>
            <p className="mt-1 text-gray-600">
              Precio base: <b>{d.precio} Bs.</b>
            </p>
            <p className="text-green-600 font-bold">
              Precio final: {d.precioFinal} Bs.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
