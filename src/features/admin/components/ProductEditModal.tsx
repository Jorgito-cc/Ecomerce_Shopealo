// src/features/product/components/ProductEditModal.tsx
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { uploadImageToCloudinary } from "../../../api/cloudinary";
import type { ProductDTO, UpdateProductDTO } from "../../../types/product";

type Props = {
  product: ProductDTO;
  onClose: () => void;
  onSave: (patch: UpdateProductDTO) => Promise<void>;
};

type FormValues = {
  name: string;
  description: string;
  price: number;
  stock?: number;
  stock_minimo?: number;
  urlImage: string;
  imageFile?: FileList;
};

export const ProductEditModal: React.FC<Props> = ({ product, onClose, onSave }) => {
  const { register, handleSubmit, formState: { isSubmitting }, setError, watch } =
    useForm<FormValues>({ defaultValues: product });

  const imageFile = watch("imageFile");

  const onSubmit = async (values: FormValues) => {
    try {
      let patch: UpdateProductDTO = {
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        stock: values.stock ? Number(values.stock) : undefined,
        stock_minimo: values.stock_minimo ? Number(values.stock_minimo) : undefined,
      };

      if (values.imageFile?.[0]) {
        const url = await uploadImageToCloudinary(values.imageFile[0]);
        patch.urlImage = url;
      } else {
        patch.urlImage = values.urlImage; // no cambia
      }

      await onSave(patch);
      onClose();
    } catch (e: any) {
      setError("root", { message: e?.response?.data?.message ?? e.message ?? "Error al editar" });
    }
  };

  const preview = imageFile?.[0] ? URL.createObjectURL(imageFile[0]) : product.urlImage;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -12 }}
          className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl p-6 shadow-2xl"
        >
          <h3 className="text-xl font-semibold mb-4">Editar producto</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Nombre</label>
              <input {...register("name", { required: true })} className="w-full border p-2 rounded mt-1" />
            </div>
            <div>
              <label className="text-sm">Precio</label>
              <input type="number" step="0.01" {...register("price", { required: true })} className="w-full border p-2 rounded mt-1" />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm">Descripción</label>
              <textarea {...register("description", { required: true })} rows={3} className="w-full border p-2 rounded mt-1" />
            </div>

            <div>
              <label className="text-sm">Stock</label>
              <input type="number" {...register("stock")} className="w-full border p-2 rounded mt-1" />
            </div>

            <div>
              <label className="text-sm">Stock mínimo</label>
              <input type="number" {...register("stock_minimo")} className="w-full border p-2 rounded mt-1" />
            </div>

            <input type="hidden" {...register("urlImage")} />

            <div className="sm:col-span-2">
              <label className="text-sm">Imagen (subir nueva si deseas cambiar)</label>
              <input type="file" accept="image/*" {...register("imageFile")} className="w-full border p-2 rounded mt-1" />
              <img src={preview} className="mt-3 h-40 object-contain rounded" />
            </div>

            <div className="sm:col-span-2 flex justify-end gap-3">
              <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancelar</button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded">
                {isSubmitting ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
