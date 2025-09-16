import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUser } from '../api/userApi';
import type { UserDTO } from '../types/auth';

export const MyAccountPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth(); // No necesitas setAuthData
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserDTO | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (!isAuthenticated || !user) {
    return <div className="text-center py-20 text-gray-500">Debes iniciar sesión para ver esta página.</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => (prevData ? { ...prevData, [name]: value } : null));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;

    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      // 1. Llama a la API con los datos actualizados
      await updateUser(user.id, formData);

      // 2. Muestra un mensaje de éxito
      setSuccess('Datos actualizados correctamente.');

      // 3. Oculta el modo de edición
      setIsEditing(false);
      
      // 4. Recarga la página para que el AuthProvider vuelva a obtener los datos del usuario de localStorage
      window.location.reload(); 
      
    } catch (err) {
      console.error('Error al actualizar los datos:', err);
      setError('Error al actualizar. Por favor, inténtelo de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mi Cuenta</h1>
      
      {success && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{success}</div>}
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        <form onSubmit={handleUpdate}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              {isEditing ? (
                <input
                  type="text"
                  name="nombre"
                  value={formData?.nombre || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              ) : (
                <p className="mt-1 p-2 border border-transparent rounded-md">{user.nombre}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData?.email || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              ) : (
                <p className="mt-1 p-2 border border-transparent rounded-md">{user.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rol</label>
              <p className="mt-1 p-2 border border-transparent rounded-md font-semibold text-gray-600">{user.rolNombre}</p>
            </div>
            
            {/* Otros campos que quieras agregar o editar */}
          </div>

          <div className="mt-6 flex justify-end">
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  disabled={isSaving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800"
                  disabled={isSaving}
                >
                  {isSaving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800"
              >
                Editar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};