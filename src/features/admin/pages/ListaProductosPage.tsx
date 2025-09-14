// src/features/product/pages/ListaProductosPage.tsx
import { useEffect, useState } from "react";
import { ProductEditModal } from "../components/ProductEditModal";
import { ProductCreateForm } from "./ProductCreateForm";
import { deleteProduct, getProducts, updateProduct } from "../../../api/productApi";
import type { ProductDTO, UpdateProductDTO } from "../../../types/product";

export const ListaProductosPage: React.FC = () => {
  const [items, setItems] = useState<ProductDTO[]>([]);
  const [editing, setEditing] = useState<ProductDTO | null>(null);

  const load = async () => setItems(await getProducts());
  useEffect(() => { load(); }, []);

  const onSaveEdit = async (patch: UpdateProductDTO) => {
    if (!editing) return;
    const updated = await updateProduct(editing.id, patch);
    setItems(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const onDelete = async (id: number) => {
    if (!confirm("¿Eliminar producto?")) return;
    await deleteProduct(id);
    setItems(prev => prev.filter(p => p.id !== id));
  };

  return (
    <section className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Productos</h1>

    

      <div className="overflow-x-auto rounded-lg shadow border bg-white">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Imagen</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Nombre</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Precio</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Stock</th>
              <th className="px-4 py-2 text-center text-xs font-medium uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">
                  <img src={p.urlImage} className="h-10 w-10 object-cover rounded" />
                </td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">${Number(p.price).toFixed(2)}</td>
                <td className="px-4 py-2">{p.stock ?? 0}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => setEditing(p)}
                      className="px-2 py-1 text-sm rounded bg-yellow-400 text-white hover:bg-yellow-500"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="px-2 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={6}>Sin productos</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <ProductEditModal
          product={editing}
          onClose={() => setEditing(null)}
          onSave={onSaveEdit}
        />
      )}
    </section>
  );
};
