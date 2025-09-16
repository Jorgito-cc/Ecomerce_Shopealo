
import React, { useMemo, useState } from "react";

type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: string;
};

const SECTIONS: Section[] = [
  {
    id: "overview",
    title: "Resumen general",
    paragraphs: [
      "Esta aplicación administra usuarios y un inventario (productos, categorías, proveedores).",
      "El sidebar tiene 2 bloques principales: Usuario e Inventario. Cada bloque contiene páginas relacionadas."
    ],
  },
  {
    id: "usuario",
    title: "Usuario — rutas y páginas",
    bullets: [
      "Bitácora — historial de acciones (GET /api/v1/bitacora).",
      "Lista de Usuarios — mostrar, editar (PATCH /api/v1/usuario/:id) y baja lógica (DELETE soft delete).",
      "Registrar Empleado — POST /api/v1/auth/register con roleId=3 (chofer).",
      "Registrar Cliente — POST /api/v1/auth/register con roleId=2 (cliente)."
    ],
    code:
      `// ejemplo: register empleado (frontend)
fetch(import.meta.env.VITE_API_URL + '/api/v1/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nombre, email, password, roleId: 3 })
})`,
  },
  {
    id: "inventario",
    title: "Inventario — páginas y endpoints",
    bullets: [
      "Registrar Producto — POST /api/v1/product (subir imagen a Cloudinary primero).",
      "Listar Producto — GET /api/v1/product.",
      "Registrar Categoría — POST /api/v1/category.",
      "Registrar Proveedores — POST /api/v1/provider; Listar Proveedores — GET /api/v1/provider."
    ],
    code:
      `// flujo subir imagen -> crear producto (ejemplo)
const form = new FormData();
form.append('file', file);
form.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
const r = await fetch(\`https://api.cloudinary.com/v1_1/\${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload\`, { method: 'POST', body: form });
const j = await r.json();
const urlImage = j.secure_url;
await fetch(import.meta.env.VITE_API_URL + '/api/v1/product', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, description, price, stock, urlImage, categoryId })
})`,
  },
  {
    id: "env",
    title: "Variables de entorno importantes",
    bullets: [
      "VITE_API_URL — URL base del backend.",
      "VITE_CLOUDINARY_CLOUD_NAME — nombre del cloud (no poner api secret).",
      "VITE_CLOUDINARY_UPLOAD_PRESET — unsigned preset para subir desde el frontend."
    ],
    code: `VITE_API_URL=https://backend-ecommerce-production-9be2.up.railway.app
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset`,
  },
];

export const Manual: React.FC = () => {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

  const filtered = useMemo(() => {
    if (!query.trim()) return SECTIONS;
    const q = query.toLowerCase();
    return SECTIONS.filter((s) => {
      const haystack =
        (s.title + " " + (s.paragraphs || []).join(" ") + " " + (s.bullets || []).join(" ") + " " + (s.code || "")).toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  const copyToClipboard = async (text?: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      // feedback simple
      alert("Copiado al portapapeles");
    } catch {
      alert("No se pudo copiar (permiso denegado).");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-indigo-700">Manual de la aplicación</h1>
          <p className="text-sm text-gray-600">Guía rápida: rutas, endpoints, patrones y variables de entorno.</p>
        </div>

        <div className="w-full md:w-1/3 flex items-center gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en el manual..."
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={() => { setQuery(""); setActiveId(SECTIONS[0].id); }}
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            title="Limpiar búsqueda"
          >
            Limpiar
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <nav className="md:col-span-1 bg-white rounded shadow p-3 max-h-[64vh] overflow-auto">
          <ul className="space-y-2">
            {filtered.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setActiveId(s.id)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${activeId === s.id ? "bg-indigo-50 border border-indigo-200" : "hover:bg-gray-50"}`}
                >
                  <div className="font-medium text-sm text-gray-800">{s.title}</div>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="md:col-span-3 bg-white rounded shadow p-6 max-h-[64vh] overflow-auto">
          {filtered.map((s) => (
            <section key={s.id} className={activeId === s.id ? "" : "hidden"}>
              <h2 className="text-xl font-semibold text-indigo-600 mb-2">{s.title}</h2>

              {s.paragraphs?.map((p, i) => (
                <p key={i} className="text-sm text-gray-700 mb-2">{p}</p>
              ))}

              {s.bullets && (
                <ul className="list-disc pl-5 mb-3 text-gray-700">
                  {s.bullets.map((b, i) => <li key={i} className="mb-1">{b}</li>)}
                </ul>
              )}

              {s.code && (
                <div className="mb-4">
                  <pre className="bg-gray-900 text-white text-xs rounded p-3 overflow-auto"><code>{s.code}</code></pre>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => copyToClipboard(s.code)} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Copiar código</button>
                    <a
                      onClick={(e) => { e.preventDefault(); copyToClipboard(s.code); }}
                      href="#"
                      className="px-3 py-1 bg-gray-100 rounded text-sm"
                    >
                      Copiar texto
                    </a>
                  </div>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <button onClick={() => copyToClipboard((s.paragraphs || []).join("\n"))} className="px-3 py-1 bg-gray-200 rounded text-sm">Copiar texto</button>
              </div>
            </section>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">No se encontró nada para &quot;{query}&quot;</div>
          )}
        </main>
      </div>

      <footer className="mt-6 text-sm text-gray-500">
        <div>Nota: para subir imágenes desde el frontend usa un <strong>unsigned upload preset</strong> de Cloudinary (no pongas API secrets en el cliente).</div>
      </footer>
    </div>
  );
};

