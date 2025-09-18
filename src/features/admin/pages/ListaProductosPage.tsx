// src/features/product/pages/ListaProductosPage.tsx
import { useEffect, useState } from "react";
import { ProductEditModal } from "../components/ProductEditModal";
import { deleteProduct, getProducts, updateProduct } from "../../../api/productApi";
import type { ProductDTO, UpdateProductDTO } from "../../../types/product";
import { getCategories } from "../../../api/categoryApi";
import type { Category } from "../../../types/category";













export const ListaProductosPage: React.FC = () => {
  const [items, setItems] = useState<ProductDTO[]>([]);
  const [editing, setEditing] = useState<ProductDTO | null>(null);

  // Nuevo estado para los filtros
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [stockSort, setStockSort] = useState<"asc" | "desc" | null>(null);
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setItems(await getProducts());
      setCategories(await getCategories()); // <-- Carga las categorías al inicio
    };
    loadData();
  }, []);

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

  // Lógica de filtrado y ordenamiento
  const filteredItems = selectedCategory === null
    ? items
    : items.filter(p => p.category?.id === selectedCategory);

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (stockSort) {
      if (stockSort === "asc") return (a.stock ?? 0) - (b.stock ?? 0);
      if (stockSort === "desc") return (b.stock ?? 0) - (a.stock ?? 0);
    }
    if (priceSort) {
      if (priceSort === "asc") return a.price - b.price;
      if (priceSort === "desc") return b.price - a.price;
    }
    return 0;
  });

  const finalItems = sortedItems;
  return (
     <section className="px-4 py-10 max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold text-indigo-700 mb-6">Productos</h1>

    {/* Controles de Filtro y Ordenamiento */}
    <div className="mb-6 flex flex-wrap items-center gap-4">
      {/* Filtro por Categoría */}
      <div>
        <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">
          Filtrar por Categoría
        </label>
        <select
          id="category-filter"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedCategory ?? ""}
          onChange={(e) => {
            setSelectedCategory(e.target.value === "" ? null : Number(e.target.value));
            setStockSort(null); // Resetea el ordenamiento
            setPriceSort(null); // Resetea el ordenamiento
          }}
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Ordenar por Stock */}
      <div className="flex flex-col">
        <span className="block text-sm font-medium text-gray-700">Ordenar por Stock</span>
        <div className="mt-1 flex gap-2">
          <button
            onClick={() => { setStockSort("asc"); setPriceSort(null); }}
            className={`px-3 py-1 text-xs font-semibold rounded ${stockSort === "asc" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Menor a Mayor
          </button>
          <button
            onClick={() => { setStockSort("desc"); setPriceSort(null); }}
            className={`px-3 py-1 text-xs font-semibold rounded ${stockSort === "desc" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Mayor a Menor
          </button>
        </div>
      </div>

      {/* Ordenar por Precio */}
      <div className="flex flex-col">
        <span className="block text-sm font-medium text-gray-700">Ordenar por Precio</span>
        <div className="mt-1 flex gap-2">
          <button
            onClick={() => { setPriceSort("asc"); setStockSort(null); }}
            className={`px-3 py-1 text-xs font-semibold rounded ${priceSort === "asc" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Menor a Mayor
          </button>
          <button
            onClick={() => { setPriceSort("desc"); setStockSort(null); }}
            className={`px-3 py-1 text-xs font-semibold rounded ${priceSort === "desc" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Mayor a Menor
          </button>
        </div>
      </div>
    </div>
    
    {/* ... (el resto de la tabla) */}

    <div className="overflow-x-auto rounded-lg shadow border bg-white">
      <table className="min-w-full divide-y">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">ID</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Imagen</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Nombre</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Categoría</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Precio</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Stock</th>
            <th className="px-4 py-2 text-center text-xs font-medium uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {finalItems.map(p => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{p.id}</td>
              <td className="px-4 py-2">
                <img src={p.urlImage} className="h-10 w-10 object-cover rounded" />
              </td>
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.category?.name ?? "Sin categoría"}</td>
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
          {finalItems.length === 0 && (
            <tr><td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={7}>Sin productos</td></tr>
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