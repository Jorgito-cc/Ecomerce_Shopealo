// src/pages/ui/ModalCodigo.tsx
import { useForm } from "react-hook-form";
import { useState } from "react";

type Props = {
  email: string;
  onClose: () => void;
  onGuardar: (code: string, password: string) => Promise<void> | void;
};

type CodeForm = {
  codigo: string;
  password: string;
};

export const ModalCodigo = ({ email, onClose, onGuardar }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<CodeForm>({ mode: "onTouched" });

  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: CodeForm) => {
    setApiError(null);

    if (!/^\d{6}$/.test(data.codigo)) {
      setError("codigo", { message: "El código debe tener 6 dígitos" });
      return;
    }

    try {
      await onGuardar(data.codigo, data.password);
      reset();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "No se pudo actualizar la contraseña";
      setApiError(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="relative bg-white max-w-md w-full p-6 rounded-xl shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          aria-label="Cerrar"
        >
          ❌
        </button>

        <h2 className="text-2xl font-semibold text-center mb-2">🔐 Verificación</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Introduce el código enviado a <span className="font-medium">{email}</span> y tu nueva contraseña:
        </p>

        {apiError && (
          <div className="mb-3 text-sm text-red-600 text-center">{apiError}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            inputMode="numeric"
            {...register("codigo", { required: "Código obligatorio" })}
            placeholder="Código de 6 dígitos"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center tracking-widest"
          />
          {errors.codigo && (
            <p className="text-sm text-red-500">{errors.codigo.message}</p>
          )}

          <input
            type="password"
            {...register("password", {
              required: "Contraseña requerida",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
            placeholder="Nueva contraseña"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-60"
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
