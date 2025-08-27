import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
  email: string;
  onClose: () => void;
  onGuardar: () => void;
};

type CodeForm = {
  codigo: string;
  password: string;
};

export const ModalCodigo = ({ email, onClose, onGuardar }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeForm>();

  const onSubmit = (data: CodeForm) => {
    if (data.codigo.length !== 6) {
      toast.warning("El código debe tener 6 dígitos");
      return;
    }

    // Simulación sin API
    console.log("Código:", data.codigo);
    console.log("Nueva contraseña:", data.password);
    console.log("Para el correo:", email);

    toast.success("Contraseña actualizada correctamente (simulado)");
    onGuardar(); // cerrar modal o redirigir
  };

  return (
       <div className="bg-white max-w-md w-full p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-center mb-4">🔐 Verificación</h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Introduce el código y tu nueva contraseña:
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          maxLength={6}
          {...register("codigo", { required: "Código obligatorio" })}
          placeholder="Código de 6 dígitos"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center tracking-widest"
        />
        {errors.codigo && <p className="text-sm text-red-500">{errors.codigo.message}</p>}

        <input
          type="password"
          {...register("password", {
            required: "Contraseña requerida",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
          placeholder="Nueva contraseña"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
