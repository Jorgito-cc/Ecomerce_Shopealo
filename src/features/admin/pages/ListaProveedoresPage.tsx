import { useEffect, useState } from "react";
import type { ProviderDTO, UpdateProviderDTO } from "../../../types/provider";
import { getProviders, updateProvider } from "../../../api/providerApi"; // ¡OJO!
import { ProviderEditModal } from "../components/ProviderEditModal";
import { deleteProvider } from "../../../api/providerApi";

export const ListaProveedoresPage: React.FC = () => {
  const [rows, setRows] = useState<ProviderDTO[]>([]);
  const [editing, setEditing] = useState<ProviderDTO | null>(null);

  const load = async () => setRows(await getProviders());
  useEffect(() => { load(); }, []);

  const onSave = async (patch: UpdateProviderDTO) => {
    if (!editing) return;
    const updated = await updateProvider(editing.id, patch);
    setRows(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const onDelete = async (id: number) => {
    if (!confirm("¿Eliminar proveedor?")) return;
    await deleteProvider(id);
    setRows(prev => prev.filter(p => p.id !== id));
  };

  return (
    <section className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Proveedores</h1>

      <div className="overflow-x-auto rounded-lg shadow border bg-white">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Empresa</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Teléfono</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Dirección</th>
              <th className="px-4 py-2 text-center text-xs font-medium uppercase">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {rows.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.email}</td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.telephone}</td>
                <td className="px-4 py-2">{p.direccion}</td>
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

            {rows.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={6}>
                  Sin proveedores
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <ProviderEditModal
          provider={editing}
          onClose={() => setEditing(null)}
          onSave={onSave}
        />
      )}
    </section>
  );
};
