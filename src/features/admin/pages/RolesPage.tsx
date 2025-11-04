import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type Permiso = {
  id: number;
  nombre: string;
  status: boolean;
};

type Role = {
  id: number;
  nombre: string;
  permisos: Permiso[];
};

export const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const BACKEND_BASE = "https://backend-ecommerce-production-0ef1.up.railway.app";

  // 🔹 Listar todos los roles
  const fetchRoles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const res = await axios.get<Role[]>(`${BACKEND_BASE}/api/v1/role`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error al obtener los roles ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Obtener permisos de un rol
  const fetchRoleDetail = async (id: number) => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get<Role>(`${BACKEND_BASE}/api/v1/role/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedRole(res.data);
      toast.success(`Permisos cargados para ${res.data.nombre} 🔐`);
    } catch (err) {
      console.error(err);
      toast.error("Error al obtener permisos del rol ❌");
    }
  };

  // 🔹 Actualizar permisos y nombre del rol
  const updateRolePermissions = async () => {
    if (!selectedRole) return;
    setSaving(true);
    try {
      const token = localStorage.getItem("access_token");

      // 👇 enviamos solo los datos que el backend espera
      const payload = {
        id: selectedRole.id,
        nombre: selectedRole.nombre,
        permisos: selectedRole.permisos.map((p) => ({
          id: p.id,
          nombre: p.nombre,
          status: p.status,
        })),
      };

      const res = await axios.patch(`${BACKEND_BASE}/api/v1/role/permisosUpdate`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("✅ Rol y permisos actualizados correctamente");
      setSelectedRole(res.data);
      fetchRoles(); // refrescar lista general
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar permisos ❌");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Gestión de Roles 🔑
      </h1>

      {loading ? (
        <p>Cargando roles...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((r) => (
            <div
              key={r.id}
              className={`p-4 border rounded-lg shadow hover:shadow-lg transition cursor-pointer ${
                selectedRole?.id === r.id ? "border-indigo-600" : ""
              }`}
              onClick={() => fetchRoleDetail(r.id)}
            >
              <h3 className="text-xl font-semibold text-indigo-600">{r.nombre}</h3>
            </div>
          ))}
        </div>
      )}

      {selectedRole && (
        <div className="mt-10 bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Editar Rol: {selectedRole.nombre}
          </h2>

          {/* Nombre del rol */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-gray-700">
              Nombre del rol:
            </label>
            <input
              type="text"
              value={selectedRole.nombre}
              onChange={(e) =>
                setSelectedRole({ ...selectedRole, nombre: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Lista de permisos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {selectedRole.permisos?.map((p) => (
              <label
                key={p.id}
                className="flex items-center gap-2 bg-gray-50 p-2 rounded border border-gray-200"
              >
                <input
                  type="checkbox"
                  checked={p.status}
                  onChange={(e) =>
                    setSelectedRole({
                      ...selectedRole,
                      permisos: selectedRole.permisos.map((perm) =>
                        perm.id === p.id
                          ? { ...perm, status: e.target.checked }
                          : perm
                      ),
                    })
                  }
                />
                <span>{p.nombre}</span>
              </label>
            ))}
          </div>

          {/* Botón Guardar */}
          <button
            onClick={updateRolePermissions}
            disabled={saving}
            className="mt-6 px-5 py-2 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      )}
    </div>
  );
};
