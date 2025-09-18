import { useForm } from "react-hook-form";
import { uploadImageToCloudinary } from "../../../api/cloudinary";
import { useState, useEffect } from "react"; // <-- Agregado useEffect
import { createProduct } from "../../../api/productApi";
import { getCategories } from "../../../api/categoryApi"; // <-- Importa la función para obtener categorías
import type { CreateProductDTO } from "../../../types/product";
import type { Category } from "../../../types/category"; // <-- Importa el tipo de categoría

// **1. Añadido categoryId a FormValues**
type FormValues = Omit<CreateProductDTO, "urlImage"> & {
  imageFile?: FileList;
  categoryId: number; // <-- Añadido el ID de la categoría
};

export const ProductCreateForm: React.FC<{ onCreated?: () => void }> = ({ onCreated }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError } =
    useForm<FormValues>({ mode: "onTouched" });
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]); // <-- Estado para guardar las categorías
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Hook para cargar las categorías al inicio
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
        return;
      }

      // **3. Ajustado el payload para incluir categoryId**
      const payload: CreateProductDTO = {
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        stock: values.stock ? Number(values.stock) : undefined,
        stock_minimo: values.stock_minimo ? Number(values.stock_minimo) : undefined,
        urlImage,
        categoryId: Number(values.categoryId), // <-- Añadido
      };

      await createProduct(payload);
      reset();
      setPreview(null);
      onCreated?.();
    } catch (e: any) {
      setError("root", { message: e?.response?.data?.message ?? e.message ?? "Error al crear" });
    }
  };

  // Muestra un mensaje de carga mientras se obtienen las categorías
  if (isLoadingCategories) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Cargando categorías...</p>
      </div>
    );
  }

  // Muestra un mensaje si no hay categorías disponibles
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
        {/* ... (otros campos del formulario) ... */}
        
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

        {/* **2. Añadido el campo de selección de categoría** */}
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
          {errors.categoryId && (
            <p className="text-xs text-red-500">{errors.categoryId.message}</p>
          )}
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