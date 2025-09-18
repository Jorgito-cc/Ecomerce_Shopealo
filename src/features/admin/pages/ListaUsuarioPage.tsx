import { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "../../../api/userApi";
import { EditModalUsuario } from "../components/EditModalUsuario";
import type { User } from "../../../types/UsersTypes";

export const ListaUsuarioPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userEdit, setUserEdit] = useState<User | null>(null);

  // carga inicial
  useEffect(() => {
    (async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    })();
  }, []);

  // guardar cambios de edición
  const handleSave = async (updated: User) => {
    try {
      const res = await updateUser(updated.id, updated);
      setUsers(prev => prev.map(u => (u.id === res.id ? res : u)));
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  // eliminar usuario (soft delete)
  const handleDelete = async (id: number) => {
    // Nota: window.confirm() ha sido eliminado porque no se muestra en este entorno.
    // En una aplicación real, se usaría un modal de confirmación personalizado.
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      console.log(`Usuario con ID ${id} ha sido eliminado.`);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <section className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Lista de Usuarios</h1>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white text-black">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Imagen</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Nombre</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Rol</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">CI</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Teléfono</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Dirección</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Estado</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 text-sm">{user.id}</td>
                <td className="px-4 py-2 text-sm">
                  <img
                    src={user.imgUrl || "https://placehold.co/40x40/E5E7EB/A1A5B4?text=N/A"}
                    alt="User profile"
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/40x40/E5E7EB/A1A5B4?text=N/A";
                    }}
                  />
                </td>
                <td className="px-4 py-2 text-sm">{user.nombre}</td>
                <td className="px-4 py-2 text-sm">{user.email}</td>
                <td className="px-4 py-2 text-sm">{user.role?.nombre}</td>
                <td className="px-4 py-2 text-sm">{user.ci ?? 'N/A'}</td>
                <td className="px-4 py-2 text-sm">{user.phone ?? 'N/A'}</td>
                <td className="px-4 py-2 text-sm">{user.address ?? 'N/A'}</td>
                <td className="px-4 py-2 text-sm text-center">
                  <span className={`inline-block px-2 py-1 leading-none rounded-full font-semibold uppercase text-xs ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-center flex gap-2 justify-center">
                  <button
                    onClick={() => setUserEdit(user)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {userEdit && (
        <EditModalUsuario
          user={userEdit}
          onClose={() => setUserEdit(null)}
          onSave={handleSave}
        />
      )}
    </section>
  );
};
