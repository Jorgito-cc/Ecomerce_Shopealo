import { useEffect, useState } from "react";
import type { BitacoraLog } from "../../../types/bitacora";
import { getBitacoraLogs } from "../../../api/bitacora";


export const BitacoraPage = () => {
  const [logs, setLogs] = useState<BitacoraLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBitacoraLogs()
      .then((res) => setLogs(res))
      .catch((err) => console.error("Error al cargar bitácora:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Cargando bitácora...</p>;

  return (
    <section className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Bitácora del Sistema
      </h1>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white dark:bg-slate-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Acción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                IP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Hora
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-slate-800 transition">
                <td className="px-6 py-4 text-sm">{log.id}</td>
                <td className="px-6 py-4 text-sm">{log.usuario?.nombre}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs font-semibold 
                      ${log.accion.includes("SESION")
                        ? "bg-green-500"
                        : log.accion.includes("DELETE")
                        ? "bg-red-500"
                        : "bg-yellow-500"}`}
                  >
                    {log.accion}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{log.ip}</td>
                <td className="px-6 py-4 text-sm">{log.date}</td>
                <td className="px-6 py-4 text-sm">{log.hour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
