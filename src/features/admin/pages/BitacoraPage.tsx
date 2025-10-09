import { useEffect, useState } from "react";
import { getBitacoraLogs } from "../../../api/bitacora";
import type { BitacoraLog } from "../../../types/bitacora";

export const BitacoraPage = () => {
  const [logs, setLogs] = useState<BitacoraLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState(""); // 🔐 campo para ingresar contraseña
  const [authError, setAuthError] = useState("");

  const handleLoadLogs = async () => {
    try {
      setLoading(true);
      const res = await getBitacoraLogs(password);
      setLogs(res);
      setAuthError("");
    } catch (err: any) {
      setAuthError("Contraseña incorrecta o acceso no autorizado");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Bitácora del Sistema
      </h1>

      {/* 🔐 Ingreso de contraseña */}
      <div className="mb-6 flex gap-3">
        <input
          type="password"
          placeholder="Ingrese contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleLoadLogs}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Cargar Bitácora
        </button>
      </div>

      {authError && (
        <p className="text-red-500 text-sm mb-4">{authError}</p>
      )}

      {/* Tabla de resultados */}
      {!loading && logs.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white dark:bg-slate-900">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-100 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Acción</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">IP</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 text-sm">{log.id}</td>
                  <td className="px-6 py-4 text-sm">{log.usuario?.nombre}</td>
                  <td className="px-6 py-4 text-sm">{log.accion}</td>
                  <td className="px-6 py-4 text-sm">{log.ip}</td>
                  <td className="px-6 py-4 text-sm">{log.date}</td>
                  <td className="px-6 py-4 text-sm">{log.hour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
