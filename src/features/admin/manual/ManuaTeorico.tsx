
import React from "react";

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-6">
    <h3 className="text-lg font-semibold text-indigo-700 mb-2">{title}</h3>
    <div className="text-sm text-gray-800">{children}</div>
  </section>
);

const Row: React.FC<{ label: string; children?: React.ReactNode }> = ({ label, children }) => (
  <div className="mb-2">
    <div className="font-medium text-slate-700">{label}</div>
    {children && <div className="text-sm text-slate-600 mt-1">{children}</div>}
  </div>
);

const ManuaTeorico: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-indigo-700">Manual de Uso — Shoealo.Admin</h1>
          <p className="text-sm text-gray-600">Guía práctica para usuarios del panel administrativo (no técnico).</p>
        </div>
      </header>

      <main className="bg-white rounded shadow p-6">
        <Section title="Resumen rápido">
          <p>
            Esta aplicación administra usuarios, productos, categorías y proveedores. En el sidebar encontrarás dos
            bloques: <strong>Usuario</strong> e <strong>Inventario</strong>. Cada bloque contiene las páginas de
            gestión: listar/crear/editar/baja lógico.
          </p>
        </Section>

        <Section title="Flujos principales (qué hace cada página)">
          <Row label="Bitácora">
            Historial de acciones del sistema (quién hizo qué y cuándo). Solo lectura.
          </Row>

          <Row label="Lista de Usuarios">
            Muestra usuarios activos. Desde aquí puedes <strong>Editar</strong> (modal) o <strong>Dar de baja</strong>
            (baja lógica: <code>isActive=false</code>). También puedes <strong>Reactivar</strong> si tu backend expone el PATCH.
          </Row>

          <Row label="Registrar Empleado / Registrar Cliente">
            Formularios para crear cuentas. Para empleados (chofer) usa <code>roleId=3</code>. Para clientes usa
            <code>roleId=2</code>.
          </Row>

          <Row label="Registrar Producto">
            Subes una imagen a Cloudinary (preset unsigned) y luego envías el objeto producto con <code>urlImage</code>.
            Campos: <em>name, description, price, stock (opcional), stock_minimo (opcional), urlImage, categoryId</em>.
          </Row>

          <Row label="Listar Producto">
            Tabla con imagen, nombre, precio y stock; acciones: <strong>Editar</strong> (modal) y <strong>Eliminar</strong>.
          </Row>

          <Row label="Registrar Categoría / Proveedores">
            Formularios simples para crear categoría (nombre, descripción) y proveedor (email, name, telephone, direccion).
          </Row>
        </Section>

        <Section title="Qué datos rellenar en cada formulario (usuario)">
          <ul className="list-disc pl-5 text-sm text-slate-700">
            <li>
              <strong>Registrar Empleado (Chofer)</strong>:
              <div className="pl-4">
                <em>ci, username, nombre, email, password, telefono, direccion, img_dir (opcional)</em> — enviar con{" "}
                <code>roleId: 3</code>.
              </div>
            </li>
            <li>
              <strong>Registrar Cliente</strong>:
              <div className="pl-4">
                <em>nombre, email, password</em> — enviar con <code>roleId: 2</code>.
              </div>
            </li>
            <li>
              <strong>Editar Usuario</strong> (desde modal): puedes modificar email, nombre, telefono, direccion,
              username, imagen. Si cambias password, incluir password (si no, dejar vacío y no enviar).
            </li>
          </ul>
        </Section>

        <Section title="Qué datos rellenar en cada formulario (producto)">
          <ul className="list-disc pl-5 text-sm text-slate-700">
            <li>
              <strong>Crear/Editar Producto</strong>:
              <div className="pl-4">
                <em>name (texto), description (texto), price (decimal), stock (número opc), stock_minimo (número opc),
                categoryId (id numérico), urlImage (string)</em>.
              </div>
              Imagen: subir a Cloudinary unsigned (preset) desde frontend → tomar <code>secure_url</code> y guardarlo en{" "}
              <code>urlImage</code>.
            </li>
            <li>
              <strong>Crear Categoría</strong>: name (máx 50 chars), description (opc).
            </li>
            <li>
              <strong>Crear Proveedor</strong>: email, name, telephone, direccion.
            </li>
          </ul>
        </Section>

        <Section title="Cloudinary — qué variables usar (no secrets)">
          <Row label="Qué va en .env">
            <div className="pl-4 space-y-1">
              <div><code>VITE_API_URL</code> = URL base de tu backend (ej. <em>https://...railway.app</em>)</div>
              <div><code>VITE_CLOUDINARY_CLOUD_NAME</code> = tu cloud name (NO la API key)</div>
              <div><code>VITE_CLOUDINARY_UPLOAD_PRESET</code> = el upload preset unsigned (se usa en browser)</div>
            </div>
          </Row>

          <Row label="Flow para subir imagen">
            1) Crear FormData con <code>file</code> + <code>upload_preset</code>. 2) POST a{" "}
            <code>https://api.cloudinary.com/v1_1/{cloud_name}/upload</code>. 3) Usar <code>secure_url</code> devuelto en el
            body para crear el producto en el backend.
          </Row>
        </Section>

        <Section title="Recomendaciones de uso y buenas prácticas">
          <ul className="list-disc pl-5 text-sm text-slate-700">
            <li>No subas keys/secrets al frontend: usa upload preset unsigned para Cloudinary.</li>
            <li>
              Antes de editar o eliminar algo, revisa la fila correcta. Eliminar normalmente hace soft-delete; ten botón
              de “Reactivar” si necesitas restaurar.
            </li>
            <li>Si hay errores en build: revisa imports relativos y que el archivo de tipos exista (p. ej. src/types/*).</li>
            <li>Uso de roles: cliente = <code>2</code>, chofer/empleado = <code>3</code> (asegúrate que el backend los tenga).</li>
          </ul>
        </Section>

        <Section title="Atajos (copiar/pegar) — peticiones útiles">
          <div className="text-xs text-gray-800 bg-slate-50 p-3 rounded">
            <div className="mb-2 font-medium">Registrar empleado (ejemplo fetch)</div>
            <pre className="bg-white p-2 rounded text-xs overflow-auto">
{`fetch(import.meta.env.VITE_API_URL + '/api/v1/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Juan Chofer',
    email: 'chofer@example.com',
    password: 'secreto123',
    roleId: 3
  })
})`}
            </pre>

            <div className="mt-3 font-medium">Subir imagen a Cloudinary (ejemplo)</div>
            <pre className="bg-white p-2 rounded text-xs overflow-auto">
{`const fd = new FormData();
fd.append('file', fileInput.files[0]);
fd.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
const r = await fetch('https://api.cloudinary.com/v1_1/' + import.meta.env.VITE_CLOUDINARY_CLOUD_NAME + '/upload', { method: 'POST', body: fd });
const json = await r.json();
const urlImage = json.secure_url;`}
            </pre>
          </div>
        </Section>

        <footer className="mt-4 text-sm text-gray-500">
          <div>¿Querés que genere una versión imprimible (PDF/Markdown) o un componente en formato FAQ?</div>
        </footer>
      </main>
    </div>
  );
};

export default ManuaTeorico;
