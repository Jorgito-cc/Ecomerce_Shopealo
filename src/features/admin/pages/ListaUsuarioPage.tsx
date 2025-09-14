import { useEffect, useState } from "react";
import { EditModalUsuario } from "../components/EditModalUsuario";
import { FaEdit, FaTrash, FaUndo } from "react-icons/fa";
import type { User } from "../../../types/UsersType";
import { deleteUser, getUsers, restoreUser, updateUser } from "../../../api/userApi";

export const ListaUsuarioPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userEdit, setUserEdit] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getUsers();
      setUsers(data);
    })();
  }, []);

  const handleSave = async (updated: User) => {
    const res = await updateUser(updated.id, updated);
    setUsers(prev => prev.map(u => (u.id === res.id ? res : u)));
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
    await deleteUser(id);
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, isActive: false } : u)));
  };

  const handleRestore = async (id: number) => {
    const res = await restoreUser(id);
    setUsers(prev => prev.map(u => (u.id === id ? res : u)));
  };

  return (
    <section className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Lista de Usuarios</h1>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white text-black">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Nombre</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Rol</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Estado</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 text-sm">{user.id}</td>
                <td className="px-4 py-2 text-sm">{user.nombre}</td>
                <td className="px-4 py-2 text-sm">{user.email}</td>
                <td className="px-4 py-2 text-sm">{user.role?.nombre}</td>
                <td className="px-4 py-2 text-sm text-center">
                  {user.isActive ? (
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-700">
                      Activo
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-700">
                      Inactivo
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-center flex gap-3 justify-center">
                  {/* Editar */}
                  <button
                    onClick={() => setUserEdit(user)}
                    title="Editar"
                    className="p-2 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition"
                  >
                    <FaEdit />
                  </button>

                  {/* Eliminar o Reactivar */}
                  {user.isActive ? (
                    <button
                      onClick={() => handleDelete(user.id)}
                      title="Eliminar"
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                    >
                      <FaTrash />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRestore(user.id)}
                      title="Reactivar"
                      className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition"
                    >
                      <FaUndo />
                    </button>
                  )}
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
