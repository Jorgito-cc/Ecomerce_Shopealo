import React, { useState } from "react";
import { getFilteredOrders } from "../api/reportApi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const ReportesPage: React.FC = () => {
  const [filters, setFilters] = useState({
    dateStart: "",
    dateEnd: "",
    status: "",
    minTotal: "",
    maxTotal: "",
    productName: "",
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

const fetchReport = async () => {
  try {
    setLoading(true);
    const data = await getFilteredOrders({
      ...filters,
      minTotal: filters.minTotal ? Number(filters.minTotal) : undefined,
      maxTotal: filters.maxTotal ? Number(filters.maxTotal) : undefined,
    });
    setOrders(data);
  } catch (err) {
    console.error("❌ Error al obtener reporte:", err);
    alert("Error al cargar el reporte");
  } finally {
    setLoading(false);
  }
};

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("📊 Reporte de Órdenes", 14, 15);

    const tableData = orders.map((o) => [
      o.id,
      o.usuario?.nombre || "—",
      o.date,
      o.status,
      `Bs ${o.total.toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: 25,
      head: [["ID", "Cliente", "Fecha", "Estado", "Total"]],
      body: tableData,
    });

    doc.save("reporte_ordenes.pdf");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Reportes Dinámicos de Órdenes 📑
      </h1>

      {/* Filtros */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 bg-white p-4 rounded-xl shadow">
        <div>
        <label htmlFor="dateStart" className="block text-sm text-gray-600">Desde</label>
<input
  id="dateStart"
  type="date"
  name="dateStart"
  value={filters.dateStart}
  onChange={handleChange}
  className="w-full border rounded-lg p-2"
/>

<label htmlFor="dateEnd" className="block text-sm text-gray-600">Hasta</label>
<input
  id="dateEnd"
  type="date"
  name="dateEnd"
  value={filters.dateEnd}
  onChange={handleChange}
  className="w-full border rounded-lg p-2"
/>

<label htmlFor="status" className="block text-sm text-gray-600">Estado</label>
<select
  id="status"
  name="status"
  value={filters.status}
  onChange={handleChange}
  className="w-full border rounded-lg p-2"
>
  <option value="">Todos</option>
  <option value="PAGADO">Pagado</option>
  <option value="PENDIENTE">Pendiente</option>
</select>

        </div>
        <div>
          <label className="block text-sm text-gray-600">Precio mínimo</label>
          <input
            type="number"
            name="minTotal"
            value={filters.minTotal}
            onChange={handleChange}
            placeholder="Ej. 100"
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Precio máximo</label>
          <input
            type="number"
            name="maxTotal"
            value={filters.maxTotal}
            onChange={handleChange}
            placeholder="Ej. 5000"
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Producto</label>
          <input
            type="text"
            name="productName"
            value={filters.productName}
            onChange={handleChange}
            placeholder="Ej. Laptop"
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={fetchReport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Generar Reporte
        </button>
        {orders.length > 0 && (
          <button
            onClick={exportPDF}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Descargar PDF
          </button>
        )}
      </div>

      {/* Resultados */}
      {loading ? (
        <p className="text-gray-500">Cargando resultados...</p>
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border bg-white shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Cliente</th>
                <th className="px-4 py-3 text-left">Fecha</th>
                <th className="px-4 py-3 text-left">Estado</th>
                <th className="px-4 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{o.id}</td>
                  <td className="px-4 py-3">{o.usuario?.nombre || "—"}</td>
                  <td className="px-4 py-3">{o.date}</td>
                  <td className="px-4 py-3">{o.status}</td>
                  <td className="px-4 py-3 text-right">Bs {o.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No hay resultados.</p>
      )}
    </div>
  );
};
