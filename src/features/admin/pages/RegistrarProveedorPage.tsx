import { useForm } from "react-hook-form";
import { createProvider } from "../../../api/providerApi";
import type { CreateProviderDTO } from "../../../types/provider";
import { toast } from "react-toastify"; // ✅ Importamos toast

type Form = CreateProviderDTO;

export const RegistrarProveedorPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Form>();

  const onSubmit = async (data: Form) => {
    try {
      await createProvider(data);
      reset();
      // ✅ Notificación de éxito
      toast.success("Proveedor registrado correctamente 🎉", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error: any) {
      console.error("Error al registrar proveedor:", error);
      // ❌ Notificación de error
      toast.error(
        error?.response?.data?.message ||
          "Error al registrar el proveedor. Intenta nuevamente 😥",
        {
          position: "top-right",
          autoClose: 4000,
        }
      );
    }
  };

  return (
    <section className="px-4 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Registrar Proveedor
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow border p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className="sm:col-span-2">
          <label className="text-sm text-gray-600">Email</label>
          <input
            {...register("email", { required: "Obligatorio" })}
            className="w-full border p-2 rounded mt-1"
            placeholder="proveedor@empresa.com"
            type="email"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600">Nombre empresa</label>
          <input
            {...register("name", { required: "Obligatorio" })}
            className="w-full border p-2 rounded mt-1"
            placeholder="KUNNUP"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600">Teléfono</label>
          <input
            {...register("telephone", {
              required: "Obligatorio",
              pattern: {
                value: /^\d{1,10}$/,
                message: "Máx 10 dígitos",
              },
            })}
            className="w-full border p-2 rounded mt-1"
            placeholder="77445566"
          />
          {errors.telephone && (
            <p className="text-sm text-red-500">
              {errors.telephone.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm text-gray-600">Dirección</label>
          <input
            {...register("direccion", { required: "Obligatorio" })}
            className="w-full border p-2 rounded mt-1"
            placeholder="Calle Charcas - China"
          />
          {errors.direccion && (
            <p className="text-sm text-red-500">
              {errors.direccion.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2 flex justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
          >
            {isSubmitting ? "Guardando..." : "Registrar"}
          </button>
        </div>
      </form>
    </section>
  );
};
