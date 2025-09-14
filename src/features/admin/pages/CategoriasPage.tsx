// src/features/admin/pages/CategoriasPage.tsx
import { useEffect, useState } from "react";
import type { Category } from "../../../types/category";
import { createCategory, deleteCategory, getCategories } from "../../../api/categoryApi";

export const CategoriasPage = () => {
  const [items, setItems] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => setItems(await getCategories()))();
  }, []);

  const add = async () => {
    if (!name.trim()) return;
    try {
      const created = await createCategory({ name: name.trim(), description: description.trim() || undefined });
      setItems((prev) => [created, ...prev]);
      setName(""); setDescription("");
    } catch (e: any) {
      alert(e?.response?.data?.message ?? "No se pudo crear la categoría");
    }
  };

  const remove = async (id: number) => {
    if (!confirm("¿Eliminar categoría?")) return;
    await deleteCategory(id);
    setItems((p) => p.filter((c) => c.id !== id));
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
                    onClick={() => remove(c.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                  {/* Para editar, muestra un modal y llama updateCategory(c.id, { name/description }) */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
