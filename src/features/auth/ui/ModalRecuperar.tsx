import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

type Props = {
  onClose: () => void;
  onSend: (email: string) => void;
};

type EmailForm = {
  email: string;
};

export const ModalRecuperar = ({ onClose, onSend }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>();

  const onSubmit = async (data: EmailForm) => {
    toast.success("Código enviado correctamente al correo (simulado)");
    onSend(data.email);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="relative bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          <IoClose size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">🔐 Recuperar Contraseña</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">Ingresa tu correo para recibir un código:</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            {...register("email", {
              required: "Campo obligatorio",
              pattern: { value: /^\S+@\S+$/, message: "Email inválido" },
            })}
            placeholder="correo@ejemplo.com"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
              Enviar código
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
