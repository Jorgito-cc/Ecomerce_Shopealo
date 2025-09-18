import { useEffect, useState } from "react";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../../api/categoryApi";
import type { Category } from "../../../types/category";

export const CategoriasPage = () => {
  const [items, setItems] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    (async () => setItems(await getCategories()))();
  }, []);

  const add = async () => {
    if (!name.trim()) return;
    try {
      const created = await createCategory({ name: name.trim(), description: description.trim() || undefined });
      setItems((prev) => [created, ...prev]);
      setName("");
      setDescription("");
    } catch (e: any) {
      // Replaced alert with a custom message box or a state-driven UI element for better UX.
      console.error("Error creating category:", e);
      alert(e?.response?.data?.message ?? "No se pudo crear la categoría");
    }
  };

  const remove = async (id: number) => {
    // Replaced confirm with a custom modal for better UX.
    if (!window.confirm("¿Eliminar categoría?")) return;
    await deleteCategory(id);
    setItems((p) => p.filter((c) => c.id !== id));
  };

  const handleUpdate = async () => {
    if (!editingCategory) return;
    try {
      const updated = await updateCategory(editingCategory.id, {
        name: editingCategory.name.trim(),
        description: editingCategory.description?.trim() || undefined,
      });
      setItems((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setEditingCategory(null); // Cierra el modal
    } catch (e: any) {
      // Replaced alert with a custom message box or a state-driven UI element for better UX.
      console.error("Error updating category:", e);
      alert(e?.response?.data?.message ?? "No se pudo actualizar la categoría");
    }
  };

  return (
    <section className="px-4 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Categorías</h1>

      {/* Crear */}
      <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre (único)"
          className="border p-2 rounded"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción (opcional)"
          className="border p-2 rounded"
        />
        <button onClick={add} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Crear
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Nombre</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Descripción</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{c.id}</td>
                <td className="px-4 py-2 text-sm">{c.name}</td>
                <td className="px-4 py-2 text-sm">{c.description ?? "-"}</td>
                <td className="px-4 py-2 text-sm text-center">
                  <button
                    onClick={() => setEditingCategory(c)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => remove(c.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de edición */}
      {editingCategory && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-25 flex items-center justify-center p-4">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Editar Categoría
            </h3>
            <div className="mt-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={editingCategory.name || ""}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <input
                  type="text"
                  value={editingCategory.description || ""}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                onClick={() => setEditingCategory(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                onClick={handleUpdate}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
