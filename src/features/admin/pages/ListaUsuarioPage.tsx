import { staticUsers } from "../../products/infrastructure/data/staticusers";
import { useState } from "react";
import { EditModalUsuario } from "../components/EditModalUsuario";
import type { User } from "../../../core/entites/User";

export const ListaUsuarioPage = () => {
  const [users, setUsers] = useState<User[]>(staticUsers);
  const [userEdit, setUserEdit] = useState<User | null>(null);

  const handleSave = (updated: User) => {
    const updatedList = users.map((u) => (u.id === updated.id ? updated : u));
    setUsers(updatedList);
  };

  return (
    <section className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Lista de Usuarios</h1>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white text-black">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">CI</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Username</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Nombre</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Teléfono</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Dirección</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Imagen</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 text-sm">{user.id}</td>
                <td className="px-4 py-2 text-sm">{user.ci}</td>
                <td className="px-4 py-2 text-sm">{user.username}</td>
                <td className="px-4 py-2 text-sm">{user.nombre}</td>
                <td className="px-4 py-2 text-sm">{user.email}</td>
                <td className="px-4 py-2 text-sm">{user.telefono}</td>
                <td className="px-4 py-2 text-sm">{user.direccion}</td>
                <td className="px-4 py-2 text-sm">
                  {user.img_dir ? (
                    <img src={user.img_dir} alt={user.username} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  <button
                    onClick={() => setUserEdit(user)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    Editar
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
