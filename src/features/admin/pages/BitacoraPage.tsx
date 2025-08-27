
import type { Bitacora } from "../../../core/entites/Bitacora";
import { StaticBitacora } from "../../products/infrastructure/data/StaticBitacora";


export const BitacoraPage = () => {
  return (
    <section className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Bitácora del Sistema</h1>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white text-black">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Acción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Fecha</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {StaticBitacora.map((log: Bitacora) => (
              <tr key={log.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm">{log.id}</td>
                <td className="px-6 py-4 text-sm">{log.username}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs font-semibold 
                      ${log.tipo_accion === "LOGIN"
                        ? "bg-green-500"
                        : log.tipo_accion === "DELETE"
                        ? "bg-red-500"
                        : "bg-yellow-500"}`}
                  >
                    {log.tipo_accion}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{log.ip}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{log.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
