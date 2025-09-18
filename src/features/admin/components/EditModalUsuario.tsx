// src/pages/Usuario/components/EditModalUsuario.tsx
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import type { User } from "../../../types/UsersTypes";

type Props = {
  user: User;
  onClose: () => void;
  // This type definition is correct
  onSave: (data: Partial<User>) => void; 
};

export const EditModalUsuario: React.FC<Props> = ({ user, onClose, onSave }) => {
  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: user,
  });

  const onSubmit = (data: User) => {
    // Correct destructuring: separate the 'id', 'role', and 'username' properties.
    const { id, role, username, ...payload } = data;

    // If the password field is empty, remove it from the payload.
    if (!payload.password || payload.password === '') {
      delete payload.password;
    }

    // Pass the 'id' and the cleaned 'payload' to the parent's `onSave` function.
    onSave({ id, ...payload });
    onClose();
  };

  return (
    // ... the rest of your component, no changes needed here.
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg p-6 overflow-y-auto max-h-[90vh]"
        >
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">✏️ Editar Usuario</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm text-gray-700">CI</label>
              <input {...register("ci")} className="w-full border p-2 rounded mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-700">Username</label>
              <input {...register("username")} className="w-full border p-2 rounded mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-700">Nombre</label>
              <input {...register("nombre")} className="w-full border p-2 rounded mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input {...register("email")} className="w-full border p-2 rounded mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-700">Contraseña</label>
              <input type="password" {...register("password")} className="w-full border p-2 rounded mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-700">Teléfono</label>
              <input {...register("phone")} className="w-full border p-2 rounded mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-700">Dirección</label>
              <input {...register("address")} className="w-full border p-2 rounded mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-700">URL Imagen</label>
              <input {...register("imgUrl")} className="w-full border p-2 rounded mt-1" />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => { reset(); onClose(); }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
              >
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
                Confirmar
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};