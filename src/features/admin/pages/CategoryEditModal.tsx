import { useState } from "react";
import type { Category, UpdateCategoryDTO } from "../../../types/category";
import { updateCategory } from "../../../api/categoryApi";
import { motion } from "framer-motion";

type Props = {
  category: Category;
  onClose: () => void;
  onUpdate: (updatedCategory: Category) => void;
};

export const CategoryEditModal: React.FC<Props> = ({ category, onClose, onUpdate }) => {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const patch: UpdateCategoryDTO = {
        name: name.trim(),
        description: description.trim() || undefined,
      };
      const updated = await updateCategory(category.id, patch);
      onUpdate(updated);
      onClose();
    } catch (e: any) {
      console.error("Error al actualizar la categoría:", e);
      setError(e?.response?.data?.message || "No se pudo actualizar la categoría");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: -20 }}
        className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Editar Categoría</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
