import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import type { ProviderDTO, UpdateProviderDTO } from "../../../types/provider";

type Props = {
  provider: ProviderDTO;
  onClose: () => void;
  onSave: (patch: UpdateProviderDTO) => Promise<void> | void;
};

export const ProviderEditModal: React.FC<Props> = ({ provider, onClose, onSave }) => {
  const { register, handleSubmit } = useForm<UpdateProviderDTO>({
    defaultValues: {
      email: provider.email,
      name: provider.name,
      telephone: provider.telephone,
      direccion: provider.direccion,
    },
  });

  const submit = async (patch: UpdateProviderDTO) => {
    await onSave(patch);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-2">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6"
        >
          <h2 className="text-xl font-semibold text-center mb-4">Editar Proveedor</h2>

          <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-700">Email</label>
              <input {...register("email")} className="w-full border p-2 rounded mt-1" type="email" />
            </div>

            <div>
              <label className="text-sm text-gray-700">Nombre empresa</label>
              <input {...register("name")} className="w-full border p-2 rounded mt-1" />
            </div>

            <div>
              <label className="text-sm text-gray-700">Teléfono</label>
              <input {...register("telephone")} className="w-full border p-2 rounded mt-1" />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm text-gray-700">Dirección</label>
              <input {...register("direccion")} className="w-full border p-2 rounded mt-1" />
            </div>

            <div className="sm:col-span-2 mt-2 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Guardar cambios
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
