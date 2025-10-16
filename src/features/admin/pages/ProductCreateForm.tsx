import { useForm } from "react-hook-form";
import { uploadImageToCloudinary } from "../../../api/cloudinary";
import { useState, useEffect } from "react";
import { createProduct } from "../../../api/productApi";
import { getCategories } from "../../../api/categoryApi";
import type { CreateProductDTO } from "../../../types/product";
import type { Category } from "../../../types/category";
import { toast } from "react-toastify"; // ✅ Importamos Toastify

type FormValues = Omit<CreateProductDTO, "urlImage"> & {
  imageFile?: FileList;
  categoryId: number;
};

export const ProductCreateForm: React.FC<{ onCreated?: () => void }> = ({ onCreated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<FormValues>({ mode: "onTouched" });

  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (e) {
        console.error("Error fetching categories", e);
        setError("root", {
          message: "No se pudieron cargar las categorías.",
        });
        toast.error("❌ Error al cargar categorías");
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, [setError]);

  const onSubmit = async (values: FormValues) => {
    try {
      let urlImage = "";
      if (values.imageFile?.[0]) {
        urlImage = await uploadImageToCloudinary(values.imageFile[0]);
      } else {
        setError("imageFile", { message: "Debes subir una imagen" });
        toast.warning("⚠️ Debes subir una imagen antes de continuar");
        return;
      }

      const payload: CreateProductDTO = {
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        stock: values.stock ? Number(values.stock) : undefined,
        stock_minimo: values.stock_minimo ? Number(values.stock_minimo) : undefined,
        urlImage,
        categoryId: Number(values.categoryId),
      };

      await createProduct(payload);

      toast.success("✅ Producto creado correctamente");
      reset();
      setPreview(null);
      onCreated?.();
    } catch (e: any) {
      const message = e?.response?.data?.message ?? e.message ?? "Error al crear producto";
      setError("root", { message });
      toast.error(`❌ ${message}`);
    }
  };

  if (isLoadingCategories) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Cargando categorías...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">
          No hay categorías disponibles. Crea una antes de registrar un producto.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-xl shadow p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Productos</h1>
      <h2 className="text-2xl font-semibold mb-4">Registrar Producto</h2>

      {errors.root?.message && (
        <div className="mb-3 text-sm text-red-600">{errors.root.message}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nombre */}
        <div className="sm:col-span-1">
          <label className="text-sm">Nombre</label>
          <input
            {...register("name", { required: "Obligatorio" })}
            className="w-full border p-2 rounded mt-1"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Precio */}
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

        {/* Descripción */}
        <div className="sm:col-span-2">
          <label className="text-sm">Descripción</label>
          <textarea
            {...register("description", { required: "Obligatorio" })}
            className="w-full border p-2 rounded mt-1"
            rows={3}
          />
          {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
        </div>

        {/* Stock */}
        <div>
          <label className="text-sm">Stock</label>
          <input type="number" {...register("stock")} className="w-full border p-2 rounded mt-1" />
        </div>

        {/* Stock mínimo */}
        <div>
          <label className="text-sm">Stock mínimo</label>
          <input type="number" {...register("stock_minimo")} className="w-full border p-2 rounded mt-1" />
        </div>

        {/* Categoría */}
        <div className="sm:col-span-2">
          <label className="text-sm">Categoría</label>
          <select
            {...register("categoryId", {
              required: "Debes seleccionar una categoría",
              valueAsNumber: true,
            })}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId.message}</p>}
        </div>

        {/* Imagen */}
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

        {/* Botones */}
        <div className="sm:col-span-2 flex justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={() => {
              reset();
              setPreview(null);
              toast.info("Formulario limpiado");
            }}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {isSubmitting ? "Guardando..." : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
};
