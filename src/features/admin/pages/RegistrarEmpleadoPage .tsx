import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerEmpleadoRequest } from "../../../api/auth";
import { uploadImageToCloudinary } from "../../../api/cloudinary";
import type { EmpleadoRegisterRequest } from "../../../types/auth";
import { toast } from "react-toastify";

type EmpleadoForm = {
  ci?: string;
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
  direccion?: string;
  img_dir?: FileList; // Cambiado a FileList para el input de tipo 'file'
};

export const RegistrarEmpleadoPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmpleadoForm>();

  const onSubmit = async (form: EmpleadoForm) => {
    setIsSubmitting(true);
    let imgUrl = undefined;
    
    // 1. Subir la imagen a Cloudinary si se seleccionó un archivo
    if (form.img_dir && form.img_dir.length > 0) {
      try {
        imgUrl = await uploadImageToCloudinary(form.img_dir[0]);
      } catch (err: any) {
        toast.error("Error al subir la imagen.");
        setIsSubmitting(false);
        return;
      }
    }

    // 2. Preparar el payload con la URL de la imagen
    try {
      const payload: EmpleadoRegisterRequest = {
        nombre: form.nombre,
        email: form.email,
        password: form.password,
        roleId: 3, // Role de CHOFER
        ci: form.ci,
        telefono: form.telefono,
        direccion: form.direccion,
        imgUrl: imgUrl
      };
      await registerEmpleadoRequest(payload);
      toast.success("Chofer creado correctamente");
      reset();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "No se pudo registrar el chofer";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">
        Registrar Chofer
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Campo de CI */}
        <div>
          <label className="text-sm text-gray-600">CI</label>
          <input
            {...register("ci")}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="12345678"
          />
        </div>
        
        {/* Se quita el campo 'username' */}
        
        {/* Campo de Nombre */}
        <div>
          <label className="text-sm text-gray-600">Nombre</label>
          <input
            {...register("nombre", { required: "Campo obligatorio" })}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="Juan Pérez"
          />
          {errors.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}
        </div>

        {/* Campo de Email */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            {...register("email", {
              required: "Campo obligatorio",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Email inválido" },
            })}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="chofer@example.com"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Campo de Password */}
        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            {...register("password", { required: "Campo obligatorio", minLength: { value: 8, message: "Mínimo 8 caracteres" } })}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="********"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* Campo de Teléfono */}
        <div>
          <label className="text-sm text-gray-600">Teléfono</label>
          <input
            {...register("telefono")}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="75555555"
          />
        </div>

        {/* Campo de Dirección */}
        <div className="col-span-full">
          <label className="text-sm text-gray-600">Dirección</label>
          <input
            {...register("direccion")}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="Calle Falsa 123"
          />
        </div>
        
        {/* Nuevo campo para subir imagen */}
        <div className="col-span-full">
          <label className="text-sm text-gray-600">Imagen de Perfil</label>
          <input
            type="file"
            {...register("img_dir")}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>

        {/* Botones */}
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
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded disabled:opacity-60"
          >
            {isSubmitting ? "Registrando..." : "Registrar Chofer"}
          </button>
        </div>
      </form>
    </div>
  );
};