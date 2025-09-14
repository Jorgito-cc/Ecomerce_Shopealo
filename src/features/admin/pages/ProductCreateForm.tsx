// src/features/product/components/ProductCreateForm.tsx
import { useForm } from "react-hook-form";
import { uploadImageToCloudinary } from "../../../api/cloudinary";
import { useState } from "react";
import { createProduct } from "../../../api/productApi";
import type { CreateProductDTO } from "../../../types/product";

type FormValues = Omit<CreateProductDTO, "urlImage"> & { imageFile?: FileList };

export const ProductCreateForm: React.FC<{ onCreated?: () => void }> = ({ onCreated }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError } =
    useForm<FormValues>({ mode: "onTouched" });
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = async (values: FormValues) => {
    try {
      let urlImage = "";
      if (values.imageFile?.[0]) {
        urlImage = await uploadImageToCloudinary(values.imageFile[0]);
      } else {
        setError("imageFile", { message: "Debes subir una imagen" });
        return;
      }

      const payload: CreateProductDTO = {
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        stock: values.stock ? Number(values.stock) : undefined,
        stock_minimo: values.stock_minimo ? Number(values.stock_minimo) : undefined,
        urlImage,
      };

      await createProduct(payload);
      reset();
      setPreview(null);
      onCreated?.();
    } catch (e: any) {
      setError("root", { message: e?.response?.data?.message ?? e.message ?? "Error al crear" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-xl shadow p-6">
         <h1 className="text-3xl font-bold text-indigo-700 mb-6">Productos</h1>

      <h2 className="text-2xl font-semibold mb-4">Registrar Producto</h2>

      {errors.root?.message && (
        <div className="mb-3 text-sm text-red-600">{errors.root.message}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-1">
          <label className="text-sm">Nombre</label>
          <input
            {...register("name", { required: "Obligatorio" })}
            className="w-full border p-2 rounded mt-1"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="sm:col-span-1">
          <label className="text-sm">Precio</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "Obligatorio", min: 0 })}
            className="w-full border p-2 rounded mt-1"
          />
          {errors.price && <p className="text-xs text-red-500">Precio inválido</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm">Descripción</label>
          <textarea
            {...register("description", { required: "Obligatorio" })}
            className="w-full border p-2 rounded mt-1"
            rows={3}
          />
          {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
        </div>

        <div>
          <label className="text-sm">Stock</label>
          <input type="number" {...register("stock")} className="w-full border p-2 rounded mt-1" />
        </div>

        <div>
          <label className="text-sm">Stock mínimo</label>
          <input type="number" {...register("stock_minimo")} className="w-full border p-2 rounded mt-1" />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm">Imagen</label>
          <input
            type="file"
            accept="image/*"
            {...register("imageFile")}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setPreview(URL.createObjectURL(f));
            }}
            className="w-full border p-2 rounded mt-1"
          />
          {preview && <img src={preview} className="mt-3 h-36 object-contain rounded" />}
          {errors.imageFile && <p className="text-xs text-red-500">{errors.imageFile.message}</p>}
        </div>

        <div className="sm:col-span-2 flex justify-end gap-3 mt-2">
          <button type="button" onClick={() => { reset(); setPreview(null); }}
                  className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button type="submit" disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded">
            {isSubmitting ? "Guardando..." : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
};
