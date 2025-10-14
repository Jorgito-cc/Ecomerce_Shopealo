// src/pages/Backup.tsx
import React, { useEffect, useState } from "react";
import { createBackup, getBackups, deleteBackup, downloadBackup } from "../../../api/backupApi";
import type { BackupDTO } from "../../../types/backupTypes";

export const Backup: React.FC = () => {
  const [backups, setBackups] = useState<BackupDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const fetchBackups = async () => {
    setLoading(true);
    try {
      const data = await getBackups();
      setBackups(data);
    } catch (error) {
      console.error("Error al obtener backups:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      await createBackup();
      await fetchBackups();
    } catch (error) {
      alert("Error al crear backup");
    } finally {
      setCreating(false);
    }
  };

  const handleDownload = async (id: number) => {
    try {
      await downloadBackup(id);
    } catch (error) {
      alert("Error al descargar backup");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este backup permanentemente?")) return;
    try {
      await deleteBackup(id);
      setBackups((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      alert("Error al eliminar backup");
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">📦 Gestión de Backups</h1>
        <button
          onClick={handleCreate}
          disabled={creating}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
        >
          {creating ? "Generando..." : "➕ Crear Backup"}
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando lista de backups...</p>
      ) : backups.length === 0 ? (
        <p className="text-gray-500">No hay backups registrados.</p>
      ) : (
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-3 text-left">Nombre</th>
              <th className="py-2 px-3 text-left">Tipo</th>
              <th className="py-2 px-3 text-left">Tamaño</th>
              <th className="py-2 px-3 text-left">Fecha</th>
              <th className="py-2 px-3 text-left">Hora</th>
              <th className="py-2 px-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {backups.map((b) => (
              <tr key={b.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-3">{b.name}</td>
                <td className="py-2 px-3">{b.backupType}</td>
                <td className="py-2 px-3">{b.size}</td>
                <td className="py-2 px-3">{b.date}</td>
                <td className="py-2 px-3">{b.hour}</td>
                <td className="py-2 px-3 text-center space-x-2">
                  <button
                    onClick={() => handleDownload(b.id)}
                    className="px-2 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Descargar
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
