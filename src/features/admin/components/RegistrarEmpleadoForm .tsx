import { useForm } from "react-hook-form";

type EmpleadoForm = {
  ci: string;
  username: string;
  nombre: string;
  email: string;
  password: string;
  telefono: string;
  direccion: string;
  img_dir?: string;
};

export const RegistrarEmpleadoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmpleadoForm>();

  const onSubmit = (data: EmpleadoForm) => {
    console.log("Empleado registrado:", data);
    reset();
  };

  return (
    <div className="max-w-2xl w-full mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">
        Registrar Empleado
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">CI</label>
          <input
            {...register("ci", { required: "Campo obligatorio" })}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="12345678"
          />
          {errors.ci && <p className="text-sm text-red-500">{errors.ci.message}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600">Username</label>
          <input
            {...register("username", { required: "Campo obligatorio" })}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="usuario123"
          />
          {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600">Nombre</label>
          <input
            {...register("nombre", { required: "Campo obligatorio" })}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="Juan Pérez"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            {...register("email", {
              required: "Campo obligatorio",
              pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
            })}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="empleado@example.com"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            {...register("password", { required: "Campo obligatorio", minLength: 6 })}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="********"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Teléfono</label>
          <input
            {...register("telefono", {
              required: "Campo obligatorio",
              pattern: { value: /^\d{8}$/, message: "Debe tener 8 dígitos" },
            })}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="75555555"
          />
        </div>

        <div className="col-span-full">
          <label className="text-sm text-gray-600">Dirección</label>
          <input
            {...register("direccion", { required: "Campo obligatorio" })}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="Calle Falsa 123"
          />
        </div>

        <div className="col-span-full">
          <label className="text-sm text-gray-600">URL Imagen (opcional)</label>
          <input
            {...register("img_dir")}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="/img/empleado.png"
          />
        </div>

        <div className="col-span-full flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};
